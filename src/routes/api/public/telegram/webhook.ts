import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * CaseMind Telegram bot webhook.
 *
 * Telegram delivers user messages here. We verify the secret token derived
 * from the bot token, run the message through the CaseMind legal AI (same
 * gateway/models as the web assistant), store the exchange for conversation
 * context, and reply through the Telegram connector gateway.
 *
 * Server-only: no Supabase user session exists for Telegram callers, so we
 * use the service-role client for persistence (the table is server-only — no
 * anon/authenticated grants, no RLS policies).
 */

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const AI_MODEL = "google/gemini-3-flash-preview";
const HISTORY_LIMIT = 10;

const SYSTEM_PROMPT = `Siz CaseMind AI huquqiy yordamchisiz — Telegram bot orqali javob berasiz.

Qoidalar:
- Foydalanuvchi qaysi tilda yozsa (o'zbek, ingliz, rus, turk, nemis, urdu, arab va h.k.) — aynan o'sha tilda javob bering.
- Aniq, qisqa va tushunarli. Telegram uchun qisqa: asosan 150-250 so'z, faqat kerak bo'lsa ko'proq.
- Ortiqcha kirish so'zlari, uzr, takror YO'Q. To'g'ridan-to'g'ri mohiyatdan boshlang.
- Qisqa markdown (bold **matn**, bullet) ishlatish mumkin, lekin Telegram HTML formatida: <b>...</b>, <i>...</i>.
- Modda raqami, muddat, jarima yoki jazo aniq bo'lsa — raqam bilan; noaniq bo'lsa taxmin qilmang.
- Oxirida 1 qatorlik eslatma: bu yuridik maslahat o'rnini bosmaydi.`;

function deriveSecret(telegramApiKey: string): string {
  return createHash("sha256")
    .update(`telegram-webhook:${telegramApiKey}`)
    .digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

let _supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;
function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return _supabaseAdmin;
}

type TGMessage = {
  chat: { id: number };
  from?: { id: number; username?: string; first_name?: string };
  text?: string;
};

type TGUpdate = {
  update_id: number;
  message?: TGMessage;
  edited_message?: TGMessage;
};

async function sendTelegram(chatId: number, text: string, apiKey: string, lovableKey: string) {
  const response = await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    console.error("telegram sendMessage failed", response.status, body);
  }
  return response;
}

async function askLegalAI(
  history: { role: "user" | "assistant"; content: string }[],
  userText: string,
  lovableKey: string,
): Promise<string> {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userText },
  ];

  const aiResponse = await fetch(AI_URL, {
    method: "POST",
    headers: {
      "Lovable-API-Key": lovableKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages,
      temperature: 0.35,
    }),
  });

  if (!aiResponse.ok) {
    const errBody = await aiResponse.text();
    console.error("AI gateway error", aiResponse.status, errBody);
    if (aiResponse.status === 429) {
      return "Hozir AI band — biroz kuting va qayta urinib ko'ring.";
    }
    if (aiResponse.status === 402) {
      return "AI xizmati vaqtincha to'xtatilgan. Keyinroq urinib ko'ring.";
    }
    return "Kechirasiz, javob berishda xatolik yuz berdi. Qayta urinib ko'ring.";
  }

  const data = await aiResponse.json();
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    return "AI bo'sh javob qaytardi. Savolni boshqacha yozib ko'ring.";
  }
  return content.trim();
}

export const Route = createFileRoute("/api/public/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        if (!TELEGRAM_API_KEY || !LOVABLE_API_KEY) {
          return new Response("Not configured", { status: 500 });
        }

        // Verify the secret token Telegram signs every delivery with.
        const expectedSecret = deriveSecret(TELEGRAM_API_KEY);
        const actualSecret = request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "";
        if (!safeEqual(actualSecret, expectedSecret)) {
          return new Response("Unauthorized", { status: 401 });
        }

        let update: TGUpdate;
        try {
          update = (await request.json()) as TGUpdate;
        } catch {
          return Response.json({ ok: true, ignored: true });
        }

        const message = update.message ?? update.edited_message;
        if (!message?.chat?.id || typeof update.update_id !== "number") {
          return Response.json({ ok: true, ignored: true });
        }

        const chatId = message.chat.id;
        const userText = message.text?.trim() ?? "";
        const userId = message.from?.id ?? null;
        const username = message.from?.username ?? message.from?.first_name ?? null;

        // /start — greeting
        if (userText === "/start" || userText === "/help") {
          const greeting =
            "Salom! Men <b>CaseMind</b> huquqiy AI yordamchisiman.\n\n" +
            "Huquqiy savolingizni shu yerga yozing — men aniq, qisqa javob beraman.\n" +
            "O'zbek, rus, ingliz, nemis, turk, urdu, arab — qaysi tilda yozsangiz, shu tilda javob beraman.\n\n" +
            "<i>Eslatma: bu yuridik maslahat o'rnini bosmaydi.</i>";
          await sendTelegram(chatId, greeting, TELEGRAM_API_KEY, LOVABLE_API_KEY);
          return Response.json({ ok: true });
        }

        if (!userText) {
          return Response.json({ ok: true, ignored: true });
        }

        // Load recent conversation history for context.
        let history: { role: "user" | "assistant"; content: string }[] = [];
        try {
          const admin = getSupabaseAdmin();
          const { data: rows } = await admin
            .from("telegram_messages")
            .select("text, ai_reply")
            .eq("chat_id", chatId)
            .order("created_at", { ascending: false })
            .limit(HISTORY_LIMIT);
          if (rows && rows.length > 0) {
            history = rows
              .reverse()
              .filter((r): r is { text: string; ai_reply: string } => Boolean(r.text && r.ai_reply))
              .flatMap((r) => [
                { role: "user" as const, content: r.text },
                { role: "assistant" as const, content: r.ai_reply },
              ]);
          }
        } catch (err) {
          console.error("history load error", err);
        }

        // Ask the AI.
        let aiReply: string;
        try {
          aiReply = await askLegalAI(history, userText, LOVABLE_API_KEY);
        } catch (err) {
          console.error("AI call error", err);
          aiReply = "Kechirasiz, javob berishda xatolik yuz berdi. Qayta urinib ko'ring.";
        }

        // Send the reply to Telegram.
        try {
          await sendTelegram(chatId, aiReply, TELEGRAM_API_KEY, LOVABLE_API_KEY);
        } catch (err) {
          console.error("sendMessage error", err);
        }

        // Persist the exchange (idempotent on update_id).
        try {
          await getSupabaseAdmin().from("telegram_messages").upsert(
            {
              update_id: update.update_id,
              chat_id: chatId,
              user_id: userId,
              username,
              text: userText,
              ai_reply: aiReply,
              raw_update: update,
            },
            { onConflict: "update_id" },
          );
        } catch (err) {
          console.error("persist error", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
