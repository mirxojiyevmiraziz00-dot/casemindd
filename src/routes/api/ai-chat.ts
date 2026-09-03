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
  audioBase64: z.string().max(12_000_000).optional(),
  audioFormat: z.enum(["webm", "m4a", "mp3", "wav", "ogg", "aac", "flac"]).optional(),
  transcribeOnly: z.boolean().optional(),
});

const systemPrompt = `Siz CaseMind AI huquqiy yordamchisiz. Foydalanuvchi qaysi tilda yozsa (o'zbek, ingliz, rus, turk, nemis, urdu, arab va h.k.) — aynan o'sha tilda javob bering.

Javob uslubi — QAT'IY:
- Aniq, qisqa va tushunarli yozing. Ortiqcha kirish so'zlari, uzr, takror va suv gaplar YO'Q.
- To'g'ridan-to'g'ri mohiyatdan boshlang.
- Qisqa markdown sarlavhalar va bullet punktlardan foydalaning; har bir punkt 1-2 gap.
- Modda raqami, muddat, jarima yoki jazo aniq bo'lsa — raqam bilan ko'rsating; noaniq bo'lsa taxmin qilmang, "aniqlash kerak" deb yozing.
- Umumiy javob hajmi 400 so'zdan oshmasin (foydalanuvchi ko'proq so'ramasa).
- Oxirida 1 qatorlik eslatma: bu yuridik maslahat o'rnini bosmaydi.

Mazmun: huquq sohasi, O'zbekiston qonunchiligidagi holat, kerak bo'lsa xorij tajribasi (AQSH, Yevropa, Turkiya), xavf darajasi, keyingi qadamlar va kerakli hujjatlar. Rasm yoki audio yuborilsa — uning mazmunini tahlil qiling.`;


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
          const { audioBase64, audioFormat, imageDataUrl, transcribeOnly } = parsed.data;

          const attachments: unknown[] = [];
          if (imageDataUrl) attachments.push({ type: "image_url", image_url: { url: imageDataUrl } });
          if (audioBase64) {
            attachments.push({
              type: "input_audio",
              input_audio: { data: audioBase64, format: audioFormat ?? "webm" },
            });
          }

          const userMessages = attachments.length > 0 && last
            ? [
                ...parsed.data.messages.slice(0, -1),
                {
                  role: "user" as const,
                  content: [
                    { type: "text", text: last.content },
                    ...attachments,
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
                : "google/gemini-3-flash-preview",
              messages: parsed.data.visual
                ? [{ role: "user", content: `Create a premium cinematic legal-tech visual for this legal situation. No readable text, no logos. ${last?.content ?? "global justice scene"}` }]
                : [
                    {
                      role: "system",
                      content: transcribeOnly
                        ? "Siz aniq transkripsiya xizmatisiz. Audio yozuvni so'zma-so'z, aynan aytilgan tilda matnga aylantiring. Hech qanday izoh, sarlavha yoki qo'shimcha qo'shmang — faqat matnni qaytaring."
                        : systemPrompt,
                    },
                    ...userMessages,
                  ],
              modalities: parsed.data.visual ? ["image", "text"] : undefined,
              temperature: 0.35,
            }),
          });

          if (!aiResponse.ok) {
            console.error("AI gateway error", aiResponse.status, await aiResponse.text());
            if (aiResponse.status === 429) {
              return Response.json({ error: "Hozir AI band — biroz kuting va qayta urinib ko'ring." }, { status: 429 });
            }
            if (aiResponse.status === 402) {
              return Response.json({ error: "AI limiti tugadi — workspace billing'ida kredit qo'shing." }, { status: 402 });
            }
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
