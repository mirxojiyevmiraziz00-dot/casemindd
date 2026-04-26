import { createFileRoute } from "@tanstack/react-router";
import { Bot, FileText, Globe2 } from "lucide-react";

import { AiCaseAnalyzer } from "@/components/AiCaseAnalyzer";
import { AiLegalAssistant } from "@/components/AiLegalAssistant";
import { CaseMindShell } from "@/components/CaseMindShell";

export const Route = createFileRoute("/ai-tahlil")({
  head: () => ({ meta: [{ title: "AI Vaziyat Tahlilchi — CaseMind" }, { name: "description", content: "Huquqiy vaziyatni AI yordamida O‘zbekiston va xalqaro tajriba asosida tahlil qilish." }] }),
  component: AiAnalysisPage,
});

function AiAnalysisPage() {
  return (
    <CaseMindShell>
      <section className="legal-grid px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-accent">AI legal intelligence</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight text-foreground sm:text-6xl">AI Vaziyat Tahlilchi</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Matn, PDF/DOCX/rasm yoki ovozli izoh orqali muammoingizni yuboring — tizim huquq sohasi, xavf darajasi va xalqaro yechimlarni ko‘rsatadi.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[{ icon: Bot, text: "AI chatbot" }, { icon: Globe2, text: "Global taqqoslash" }, { icon: FileText, text: "PDF report" }].map((item) => <div key={item.text} className="rounded-2xl border bg-card p-5 shadow-premium"><item.icon className="mb-3 h-6 w-6 text-accent" /><p className="font-bold text-foreground">{item.text}</p></div>)}
          </div>
        </div>
      </section>
      <AiCaseAnalyzer />
      <AiLegalAssistant />
    </CaseMindShell>
  );
}
