import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpenCheck, FileText, Search, ShieldCheck, Sparkles } from "lucide-react";

import { AiLegalAssistant } from "@/components/AiLegalAssistant";
import { LegalDocumentManager } from "@/components/LegalDocumentManager";
import { LegalVisualStory } from "@/components/LegalVisualStory";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/jinoyat-kodeksi")({
  head: () => ({
    meta: [
      { title: "Jinoyat kodeksi — oson sharh" },
      {
        name: "description",
        content: "O‘zbekiston Respublikasi Jinoyat kodeksi moddalari sodda izoh, qisqa mazmun va hayotiy misollar bilan.",
      },
      { property: "og:title", content: "Jinoyat kodeksi — oson sharh" },
      {
        property: "og:description",
        content: "302 modda uchun tushunarli sharhlar, misollar va qulay qidiruv sahifasi.",
      },
    ],
  }),
  component: CriminalCodePage,
});

const codeArticles = [
  {
    number: "97-modda",
    title: "Qasddan odam o‘ldirish",
    summary: "Boshqa insonning hayotini ataylab tugatish eng og‘ir jinoyatlardan biridir.",
    simple: "Oddiy izoh: hech kim boshqa odamning hayotiga tajovuz qilishga haqli emas.",
    example: "Misol: oldindan bilib turib, odamga o‘limga olib keladigan zarar yetkazish.",
  },
  {
    number: "169-modda",
    title: "O‘g‘rilik",
    summary: "Birovning mol-mulkini yashirin ravishda egallash o‘g‘rilik hisoblanadi.",
    simple: "Oddiy izoh: egasidan ruxsat olmasdan narsani yashirib olib ketish mumkin emas.",
    example: "Misol: do‘kondan mahsulotni to‘lamay olib chiqish yoki telefonni yashirincha olish.",
  },
  {
    number: "211-modda",
    title: "Pora berish",
    summary: "Mansabdor shaxsga noqonuniy ish bitirish uchun pul yoki foyda taklif qilish jinoyat bo‘lishi mumkin.",
    simple: "Oddiy izoh: qoidani buzib, ishni pul yoki sovg‘a bilan hal qilish mumkin emas.",
    example: "Misol: ruxsatnomani navbatsiz olish uchun mansabdor shaxsga pul berish.",
  },
];

function CriminalCodePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="legal-grid px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Button variant="legal" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" /> Bosh sahifa
            </Link>
          </Button>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-legal-emerald">Jinoyat kodeksi</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-tight text-premium sm:text-6xl">
                Moddalar oson sharh formatida
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Bu bo‘limga Jinoyat kodeksining 302 moddasi kiritiladi: har bir modda qisqa mazmun, oddiy izoh va hayotiy misol bilan ochiladi.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-5 shadow-premium">
              <div className="flex items-center gap-3 rounded-xl bg-secondary p-4 text-muted-foreground">
                <Search className="h-5 w-5 text-legal-gold" /> Modda raqami yoki jinoyat nomi bo‘yicha qidirish
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Button variant="legal" className="h-auto justify-start rounded-xl border bg-muted p-4" asChild>
                  <a href="#moddalar"><span><span className="block text-2xl font-bold text-premium">302</span><span className="block text-sm text-muted-foreground">modda</span></span></a>
                </Button>
                <Button variant="legal" className="h-auto justify-start rounded-xl border bg-muted p-4" asChild>
                  <a href="#moddalar"><span><span className="block text-2xl font-bold text-premium">3</span><span className="block text-sm text-muted-foreground">izoh bosqichi</span></span></a>
                </Button>
                <Button variant="premium" className="h-auto justify-start rounded-xl p-4" asChild>
                  <a href="#ai-yordamchi"><Sparkles className="h-5 w-5" /><span><span className="block text-2xl font-bold">AI</span><span className="block text-sm">savol berish</span></span></a>
                </Button>
              </div>
            </div>
          </div>

          <div id="moddalar" className="mt-12 grid gap-5 lg:grid-cols-3">
            {codeArticles.map((article) => (
              <article key={article.number} className="premium-card rounded-2xl border p-6 shadow-premium">
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">{article.number}</span>
                  <BookOpenCheck className="h-6 w-6 text-legal-emerald" />
                </div>
                <h2 className="text-2xl font-bold text-premium">{article.title}</h2>
                <p className="mt-4 leading-7 text-card-foreground">{article.summary}</p>
                <p className="mt-4 rounded-xl bg-muted p-4 text-sm leading-6 text-muted-foreground">{article.simple}</p>
                <p className="mt-4 border-l-4 border-legal-gold pl-4 text-sm leading-6 text-ink-soft">{article.example}</p>
              </article>
            ))}
          </div>

          <LegalVisualStory />

          <LegalDocumentManager
            defaultType="criminal_code_uz"
            title="Jinoyat kodeksi hujjatlarini yuklash"
            description="O‘zbekcha Jinoyat kodeksi va keyin inglizcha variantini yuklang — ular shu bo‘limda tartiblanadi."
          />

          <div id="ai-yordamchi">
            <AiLegalAssistant />
          </div>

          <div className="mt-12 rounded-2xl border bg-card p-6 shadow-premium">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-legal-emerald">Kiritish rejasi</p>
                <h2 className="mt-2 text-3xl font-bold text-premium">To‘liq 302 modda shu yerga joylanadi</h2>
              </div>
              <ShieldCheck className="h-10 w-10 text-legal-gold" />
            </div>
            <p className="mt-4 leading-8 text-muted-foreground">
              Hozir sahifa tuzilmasi tayyor: keyingi bosqichda barcha moddalar ro‘yxati, qidiruv, filtrlash va har moddaning batafsil sharhi kiritiladi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}