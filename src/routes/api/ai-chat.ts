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

const systemPrompt = `Siz Lex Simple platformasining sun’iy intellekt huquqiy yordamchisisiz. Foydalanuvchiga O‘zbekiston Respublikasi Jinoyat kodeksi va Oliy sud Plenum qarorlarini sodda, tushunarli, qisqa va misollar bilan izohlang. Aniq yuridik maslahat yoki advokat o‘rnini bosuvchi xulosa bermang; zarur bo‘lsa mutaxassisga murojaat qilishni eslating. Javoblarni o‘zbek tilida, markdown bilan tartibli bering.`;

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
