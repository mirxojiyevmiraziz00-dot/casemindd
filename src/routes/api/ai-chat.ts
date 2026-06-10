import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(20),
  visual: z.boolean().optional(),
  imageDataUrl: z.string().max(8_000_000).optional(),
});

const systemPrompt = `Siz CaseMind global legal-tech platformasining premium AI huquqiy yordamchisisiz. Foydalanuvchi qaysi tilda yozsa — o'zbek, ingliz, rus, nemis, urdu, arab, turk, fransuz, ispan, xitoy va boshqa istalgan tilda — aynan o'sha tilda tabiiy va professional javob bering. Avtomatik til aniqlang. Har qanday savolga foydali javob bering, lekin huquqiy mavzuda bo'lsa, O'zbekiston huquqi, AQSH, UK, Yevropa Ittifoqi, Turkiya, Rossiya, BAA, Yaponiya, Janubiy Koreya va xalqaro tajriba kesimida tahlil qiling. Jinoyat, fuqarolik, oila, mehnat, soliq, ma'muriy, biznes, kiber, intellektual mulk, migratsiya va konstitutsiyaviy huquq sohalarini aniqlang. Javobda huquq sohasi, O'zbekistondagi holat, xorijiy yondashuvlar, xavf darajasi, sud amaliyoti, o'xshash case'lar, keyingi qadamlar va kerakli dalillarni markdown bilan tartibli bering. Foydalanuvchi rasm yuborsa — undagi hujjat, yozuv yoki sahnani huquqiy nuqtai nazardan tahlil qiling. Bu yuridik maslahat o'rnini bosmasligini eslating.`;

const buildFallbackAnswer = (prompt: string) => `## Tezkor huquqiy yo'nalish

Hozircha avtomatik rejimda umumiy tahlil beraman. Vaziyatingiz bo'yicha quyidagilarni tekshiring:

- **Huquq sohasi:** matnda shartnoma, ish haqi, oila, jinoyat, soliq yoki biznes alomatlarini ajrating.
- **O'zbekiston bo'yicha:** tegishli kodeks yoki qonun normalari, yozma dalillar, muddatlar va vakolatli organlarni aniqlang.
- **Xorijiy yondashuv:** ko'p davlatlarda asosiy mezonlar — dalil, zarar, sababiy bog'liqlik, taraflarning majburiyati va protsessual muddatlar.
- **Xavf darajasi:** hujjat, pul, muddat yoki javobgarlik bor bo'lsa yuqori; oddiy tushuntirish va muzokara bo'lsa o'rtacha.
- **Keyingi qadamlar:** barcha dalillarni saqlang, yozma talabnoma yuboring, muddatlarni o'tkazib yubormang, zarur bo'lsa yuristga murojaat qiling.
- **Kerakli dalillar:** shartnoma, chek, yozishmalar, audio/video, guvohlar, ariza nusxasi, rasmiy javoblar.

**Foydalanuvchi savoli:** ${prompt.slice(0, 1200)}

Bu yakuniy yuridik maslahat emas; aniq qaror uchun malakali mutaxassis bilan maslahat qiling.`;

export const Route = createFileRoute("/api/ai-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = ChatRequestSchema.safeParse(await request.json());
          if (!parsed.success) {
            return Response.json({ error: "Xabar formati noto'g'ri." }, { status: 400 });
          }

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "AI xizmati hozircha sozlanmagan." }, { status: 500 });
          }

          const last = parsed.data.messages.at(-1);
          const userMessages = parsed.data.imageDataUrl && last
            ? [
                ...parsed.data.messages.slice(0, -1),
                {
                  role: "user" as const,
                  content: [
                    { type: "text", text: last.content },
                    { type: "image_url", image_url: { url: parsed.data.imageDataUrl } },
                  ] as unknown as string,
                },
              ]
            : parsed.data.messages;

          const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "vercel-ai-sdk",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: parsed.data.visual
                ? "google/gemini-3.1-flash-image-preview"
                : parsed.data.imageDataUrl
                  ? "google/gemini-2.5-flash"
                  : "google/gemini-2.5-flash-lite",
              messages: parsed.data.visual
                ? [{ role: "user", content: `Create a premium cinematic legal-tech visual for this legal situation. No readable text, no logos. ${last?.content ?? "global justice scene"}` }]
                : [{ role: "system", content: systemPrompt }, ...userMessages],
              modalities: parsed.data.visual ? ["image", "text"] : undefined,
              temperature: 0.35,
            }),
          });

          if ((aiResponse.status === 429 || aiResponse.status === 402) && !parsed.data.visual) {
            return Response.json({ content: buildFallbackAnswer(last?.content ?? "Huquqiy vaziyat") });
          }
          if (!aiResponse.ok) {
            console.error("AI gateway error", aiResponse.status, await aiResponse.text());
            return Response.json({ error: "AI javob berishda xatolik yuz berdi." }, { status: 500 });
          }

          const data = await aiResponse.json();
          const content = data.choices?.[0]?.message?.content;
          const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

          if (parsed.data.visual && typeof imageUrl === "string" && imageUrl.startsWith("data:image")) {
            return Response.json({ content: content || "Visual tayyor.", imageUrl });
          }
          if (typeof content !== "string" || !content.trim()) {
            return Response.json({ error: "AI bo'sh javob qaytardi." }, { status: 500 });
          }
          return Response.json({ content });
        } catch (error) {
          console.error("ai-chat route error", error);
          return Response.json({ error: "AI bilan bog'lanishda xatolik yuz berdi." }, { status: 500 });
        }
      },
    },
  },
});
