import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FileText, Gavel, Scale, Sparkles } from "lucide-react";

import { AiLegalAssistant } from "@/components/AiLegalAssistant";
import { LegalDocumentManager } from "@/components/LegalDocumentManager";
import { LegalVisualStory } from "@/components/LegalVisualStory";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/plenum-qarorlari")({
  head: () => ({
    meta: [
      { title: "Oliy sud Plenum qarorlari — oson sharh" },
      {
        name: "description",
        content: "Oliy sud Plenum qarorlari sodda tilda: nima dedi, oddiy ma’nosi va amaliy misollar.",
      },
      { property: "og:title", content: "Oliy sud Plenum qarorlari — oson sharh" },
      {
        property: "og:description",
        content: "Sud amaliyotini tushuntiruvchi Plenum qarorlari premium va tushunarli formatda.",
      },
    ],
  }),
  component: PlenumPage,
});

const plenumDecisions = [
  {
    title: "Jazo tayinlash bo‘yicha tushuntirishlar",
    meaning: "Sud jazo belgilashda ayb darajasi, zarar, shaxsiy holat va yengillashtiruvchi omillarni baholaydi.",
    example: "Masalan, aybini tan olgan va zararni qoplagan shaxsga yengilroq yondashuv qo‘llanishi mumkin.",
  },
  {
    title: "Dalillarni baholash tartibi",
    meaning: "Dalil qonuniy olingan, tekshirilgan va ishga aloqador bo‘lishi kerak.",
    example: "Masalan, noqonuniy usulda olingan ma’lumot sud qaroriga asos bo‘la olmaydi.",
  },
  {
    title: "Bir xil sud amaliyoti",
    meaning: "Plenum qarorlari sudlarga o‘xshash holatlarda yagona yondashuv beradi.",
    example: "Masalan, bir turdagi jinoyatlar bo‘yicha sudlar bir-biriga yaqin mantiqda qaror chiqaradi.",
  },
];

function PlenumPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="legal-grid px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Button variant="legal" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" /> Bosh sahifa
            </Link>
          </Button>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-legal-emerald">Oliy sud Plenumi</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-tight text-premium sm:text-6xl">
                Plenum qarorlari oddiy yo‘l xaritasi kabi
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Bu bo‘limga Oliy sud Plenum qarorlari kiritiladi va har biri “nima dedi?”, “oddiy ma’nosi nima?”, “amaliy misol qanday?” shaklida tushuntiriladi.
              </p>
            </div>
            <div className="premium-card rounded-2xl border p-6 shadow-premium">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-premium text-premium-foreground">
                <Gavel className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-premium">Sud amaliyoti sodda tilda</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Qarorlar murakkab huquqiy matndan amaliy, tushunarli va misolli ko‘rinishga o‘tkaziladi.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="premium" asChild>
                  <a href="#plenum-royxat">Qarorlarni ko‘rish</a>
                </Button>
                <Button variant="legal" asChild>
                  <a href="#ai-yordamchi"><Sparkles className="h-4 w-4" /> AI savol</a>
                </Button>
              </div>
            </div>
          </div>

          <div id="plenum-royxat" className="mt-12 grid gap-5 lg:grid-cols-3">
            {plenumDecisions.map((decision, index) => (
              <article key={decision.title} className="rounded-2xl border bg-card p-6 shadow-premium transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-premium text-premium-foreground">{index + 1}</div>
                  <Scale className="h-6 w-6 text-legal-gold" />
                </div>
                <h2 className="text-2xl font-bold text-premium">{decision.title}</h2>
                <p className="mt-4 leading-7 text-card-foreground">{decision.meaning}</p>
                <p className="mt-4 rounded-xl bg-muted p-4 text-sm leading-6 text-muted-foreground">{decision.example}</p>
              </article>
            ))}
          </div>

          <LegalVisualStory />

          <LegalDocumentManager
            defaultType="plenum_decision"
            title="Oliy sud Plenum qarorlarini yuklash"
            description="Plenum qarorlarini fayl ko‘rinishida yuklang — ular alohida bo‘limga ajratilib, keyin sodda sharhga tayyorlanadi."
          />

          <div id="ai-yordamchi">
            <AiLegalAssistant />
          </div>

          <div className="mt-12 rounded-2xl border bg-card p-6 shadow-premium">
            <div className="flex gap-4">
              <FileText className="mt-1 h-7 w-7 shrink-0 text-legal-emerald" />
              <div>
                <h2 className="text-3xl font-bold text-premium">Plenum qarorlarini kiritish uchun tayyor bo‘lim</h2>
                <div className="mt-5 space-y-3">
                  {["Qarorning asl mavzusi", "Oddiy ma’nosi", "Sud amaliyotidagi misol"].map((item) => (
                    <p key={item} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-legal-emerald" /> {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}