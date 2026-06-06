import { createFileRoute } from "@tanstack/react-router";
import { Bot, FileText, Globe2 } from "lucide-react";

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
            <div className="grid gap-8 sm:grid-cols-2">
              {[founderPortrait, founderPortraitTwo].map((src, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div
                      className="portrait-motion h-48 w-48 overflow-hidden rounded-full border-4 border-accent/30 bg-secondary shadow-premium sm:h-56 sm:w-56"
                      style={{ animationDelay: `${idx * 0.6}s` }}
                    >
                      <img
                        src={src}
                        alt="CaseMind legal AI vakili portreti"
                        className="h-full w-full object-cover"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-md sm:h-12 sm:w-12">
                      <Instagram className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
                    </div>
                  </div>
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
