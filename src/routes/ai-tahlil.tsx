import { createFileRoute } from "@tanstack/react-router";
import { Bot, FileText, Globe2, ScanFace, Sparkles } from "lucide-react";

import founderPortrait from "@/assets/casemind-founder.png";
import { AiCaseAnalyzer } from "@/components/AiCaseAnalyzer";
import { AiLegalAssistant } from "@/components/AiLegalAssistant";
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
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="cinematic-scan rounded-2xl border bg-card p-5 shadow-premium">
              <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-xl bg-secondary">
                <div className="absolute inset-0 legal-grid opacity-40" />
                <div className="portrait-motion absolute inset-x-0 bottom-0 mx-auto w-[94%]">
                  <img
                    src={founderPortrait}
                    alt="CaseMind legal AI vakili portreti"
                    className="relative z-10 w-full object-contain drop-shadow-2xl"
                    loading="eager"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border bg-card/85 px-3 py-2 text-xs font-bold uppercase text-accent backdrop-blur">
                  <ScanFace className="h-4 w-4" /> Live AI avatar
                </div>
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-premium">
              <Sparkles className="mb-4 h-8 w-8 text-accent" />
              <h2 className="text-4xl font-black text-foreground">
                Motion portretli AI konsultant
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Yuklangan portret endi sahifada premium motion effekt bilan ko‘rinadi: yengil
                suzish, mimika signallari va cinematic scan animatsiyasi AI tahlil tajribasini
                jonlantiradi.
              </p>
            </div>
          </div>
        </div>
      </section>
      <AiCaseAnalyzer />
      <AiLegalAssistant />
    </CaseMindShell>
  );
}
