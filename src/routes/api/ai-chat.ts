import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
});

const systemPrompt = `Siz CaseMind global legal-tech platformasining premium AI huquqiy yordamchisisiz. Foydalanuvchi qaysi tilda yozsa — o‘zbek, ingliz, rus, nemis, urdu, arab, turk, fransuz yoki boshqa tilda — aynan o‘sha tilda tabiiy va professional javob bering. Har qanday savolga foydali javob bering, lekin huquqiy mavzuda bo‘lsa, O‘zbekiston huquqi, AQSH, UK, Yevropa Ittifoqi, Turkiya, Rossiya, BAA, Yaponiya, Janubiy Koreya va xalqaro tajriba kesimida tahlil qiling. Jinoyat, fuqarolik, oila, mehnat, soliq, ma’muriy, biznes, kiber, intellektual mulk, migratsiya va konstitutsiyaviy huquq sohalarini aniqlang. Javobda huquq sohasi, O‘zbekistondagi holat, xorijiy yondashuvlar, xavf darajasi, sud amaliyoti, o‘xshash case’lar, keyingi qadamlar va kerakli dalillarni markdown bilan tartibli bering. Javob oxirida "Visual brief" degan qisqa bo‘lim qo‘shing: vaziyatga mos rasm/video sahnasi qanday ko‘rinishini 1-2 jumlada tasvirlang. Bu yuridik maslahat o‘rnini bosmasligini eslating.`;

export const Route = createFileRoute("/api/ai-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsed = ChatRequestSchema.safeParse(await request.json());

          if (!parsed.success) {
            return Response.json({ error: "Xabar formati noto‘g‘ri." }, { status: 400 });
          }

          const apiKey = process.env.LOVABLE_API_KEY;

          if (!apiKey) {
            return Response.json({ error: "AI xizmati hozircha sozlanmagan." }, { status: 500 });
          }

          const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: systemPrompt }, ...parsed.data.messages],
              temperature: 0.35,
            }),
          });

          if (aiResponse.status === 429) {
            return Response.json({ error: "AI hozir band. Birozdan keyin qayta urinib ko‘ring." }, { status: 429 });
          }

          if (aiResponse.status === 402) {
            return Response.json({ error: "AI limiti tugagan. Workspace usage balansini to‘ldirish kerak." }, { status: 402 });
          }

          if (!aiResponse.ok) {
            console.error("AI gateway error", aiResponse.status, await aiResponse.text());
            return Response.json({ error: "AI javob berishda xatolik yuz berdi." }, { status: 500 });
          }

          const data = await aiResponse.json();
          const content = data.choices?.[0]?.message?.content;

          if (typeof content !== "string" || !content.trim()) {
            return Response.json({ error: "AI bo‘sh javob qaytardi." }, { status: 500 });
          }

          return Response.json({ content });
        } catch (error) {
          console.error("ai-chat route error", error);
          return Response.json({ error: "AI bilan bog‘lanishda xatolik yuz berdi." }, { status: 500 });
        }
      },
    },
  },
});
