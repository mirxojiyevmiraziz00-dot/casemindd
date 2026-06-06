import { createFileRoute } from "@tanstack/react-router";
import { Bot, FileText, Globe2, ScanFace, Sparkles } from "lucide-react";

import founderPortrait from "@/assets/casemind-founder-clean.png";
import founderPortraitTwo from "@/assets/casemind-founder-3.png";
import { AiCaseAnalyzer } from "@/components/AiCaseAnalyzer";
import { CaseMindShell } from "@/components/CaseMindShell";

export const Route = createFileRoute("/ai-tahlil")({
  head: () => ({
    meta: [
      { title: "AI Vaziyat Tahlilchi — CaseMind" },
      {
        name: "description",
        content:
          "Huquqiy vaziyatni AI yordamida O‘zbekiston va xalqaro tajriba asosida tahlil qilish.",
      },
    ],
  }),
  component: AiAnalysisPage,
});

function AiAnalysisPage() {
  return (
    <CaseMindShell>
      <section className="legal-grid px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-accent">AI legal intelligence</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight text-foreground sm:text-6xl">
            AI Vaziyat Tahlilchi
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Matn, PDF/DOCX/rasm yoki ovozli izoh orqali muammoingizni yuboring — tizim huquq sohasi,
            xavf darajasi va xalqaro yechimlarni ko‘rsatadi.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Bot, text: "AI chatbot" },
              { icon: Globe2, text: "Global taqqoslash" },
              { icon: FileText, text: "PDF report" },
            ].map((item) => (
              <div key={item.text} className="rounded-2xl border bg-card p-5 shadow-premium">
                <item.icon className="mb-3 h-6 w-6 text-accent" />
                <p className="font-bold text-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-accent/40 bg-accent/10 p-6 shadow-premium">
            <p className="text-sm font-semibold uppercase text-accent">E'lon</p>
            <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
              Bu AI mutlaqo tekin
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Ushbu loyihani rivojlantirish uchun sizdan talab qilinadigan narsa faqat savol
              yozishdir. Har bir savol uchun sizga{" "}
              <span className="font-bold text-foreground">1000 so'm</span> mukofot taqdim etiladi:
              500 so'mi loyiha rivoji uchun olib qolinadi, qolgan 500 so'mi plastik kartangizga
              o'tkazib olishingiz mumkin. Mablag' akkauntingizning{" "}
              <span className="font-bold text-foreground">"Salaries"</span> bo'limida yig'ilib
              boriladi.
            </p>
          </div>
          <div className="mt-10 cinematic-scan rounded-2xl border bg-card p-5 shadow-premium">
            <div className="grid gap-4 sm:grid-cols-2">
              {[founderPortrait, founderPortraitTwo].map((src, idx) => (
                <div key={idx} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
                  <div className="absolute inset-0 legal-grid opacity-40" />
                  <div className="portrait-motion absolute inset-x-0 bottom-0 mx-auto w-[94%]" style={{ animationDelay: `${idx * 0.6}s` }}>
                    <img
                      src={src}
                      alt="CaseMind legal AI vakili portreti"
                      className="relative z-10 w-full object-contain drop-shadow-2xl"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AiCaseAnalyzer />
    </CaseMindShell>
  );
}
