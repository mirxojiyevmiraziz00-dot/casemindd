import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  Gavel,
  Landmark,
  Library,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jinoyat kodeksi oson sharh" },
      {
        name: "description",
        content:
          "O‘zbekiston Respublikasi Jinoyat kodeksining 302 moddasi va Oliy sud Plenum qarorlari oson sharh, misollar va premium formatda.",
      },
      { property: "og:title", content: "Jinoyat kodeksi oson sharh" },
      {
        property: "og:description",
        content: "302 modda, oddiy tushuntirish, hayotiy misollar va Plenum qarorlari.",
      },
    ],
  }),
  component: Index,
});

const chapters = [
  { title: "Shaxsga qarshi jinoyatlar", range: "97–149", tone: "Hayot, sog‘liq, sha’n", icon: ShieldCheck },
  { title: "Tinchlik va xavfsizlik", range: "150–163", tone: "Jamiyat himoyasi", icon: Scale },
  { title: "Iqtisodiyot sohasida", range: "164–192", tone: "Mulk va bitimlar", icon: Landmark },
  { title: "Boshqaruv tartibi", range: "193–241", tone: "Davlat tartibi", icon: Gavel },
  { title: "Jamoat xavfsizligi", range: "242–278", tone: "Tartib va xavfsizlik", icon: Library },
  { title: "Harbiy jinoyatlar", range: "279–302", tone: "Xizmat intizomi", icon: FileText },
];

const sampleArticles = [
  {
    number: "97-modda",
    title: "Qasddan odam o‘ldirish",
    simple: "Birovni ataylab o‘ldirish eng og‘ir jinoyatlardan biri hisoblanadi.",
    kid: "Juda oddiy aytganda: hech kim boshqa odamning hayotini tortib olishga haqli emas.",
    example: "Masalan, kishi janjal paytida oldindan bilib turib boshqasiga halokatli zarar yetkazsa.",
  },
  {
    number: "169-modda",
    title: "O‘g‘rilik",
    simple: "Birovning mol-mulkini yashirincha olish o‘g‘rilikdir.",
    kid: "Juda oddiy aytganda: birovning narsasini so‘ramasdan yashirib olib ketish — noto‘g‘ri.",
    example: "Masalan, do‘kondan pulini to‘lamay mahsulot olib chiqish yoki cho‘ntakdan telefon olish.",
  },
  {
    number: "211-modda",
    title: "Pora berish",
    simple: "Mansabdor shaxsga noqonuniy foyda evaziga ish bitirishni so‘rash jinoyat bo‘lishi mumkin.",
    kid: "Juda oddiy aytganda: qoidani buzib, kimnidir sovg‘a bilan aldab ish qildirish mumkin emas.",
    example: "Masalan, ruxsatnomani navbatsiz olish uchun pul taklif qilish.",
  },
];

const plenumItems = [
  "Sudlar bir xil vaziyatni bir xil tushunishi uchun yo‘l-yo‘riq beradi.",
  "Jazo tayinlashda ayb, zarar, pushaymonlik va yengillashtiruvchi holatlar ko‘riladi.",
  "Dalillar qonuniy olingan bo‘lishi va sudda tekshirilishi kerak.",
];

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="premium-hero legal-grid relative text-premium-foreground">
        <div className="absolute inset-0 bg-gradient-to-b from-premium/10 via-premium/0 to-background" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-legal-gold/40 bg-premium-foreground/10 shadow-glow backdrop-blur">
              <Gavel className="h-5 w-5 text-legal-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-legal-gold">Lex Simple</p>
              <p className="text-xs text-premium-foreground/70">Oson huquq kutubxonasi</p>
            </div>
          </div>
          <Button variant="premium" className="hidden sm:inline-flex">
            <Search className="h-4 w-4" /> Qidirish
          </Button>
        </nav>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-16">
          <div className="animate-reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-legal-gold/35 bg-premium-foreground/10 px-4 py-2 text-sm text-premium-foreground/85 backdrop-blur">
              <Sparkles className="h-4 w-4 text-legal-gold" /> 302 modda — oddiy tilda, misollar bilan
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Jinoyat kodeksi 5 yoshli bola ham tushunadigan tilda
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-premium-foreground/78">
              Har bir modda murakkab yuridik tildan chiqarilib, qisqa mazmun, hayotiy misol va “bolacha izoh” bilan beriladi. Oliy sud Plenum qarorlari ham oddiy mantiq bo‘yicha tushuntiriladi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="premium" size="lg">
                Moddalarni ko‘rish <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="legal" size="lg" className="border-premium-foreground/25 bg-premium-foreground/10 text-premium-foreground hover:bg-premium-foreground hover:text-premium">
                Plenum izohlari
              </Button>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute -inset-6 rounded-3xl bg-legal-gold/20 blur-3xl" />
            <div className="premium-card relative rounded-2xl border border-premium-foreground/18 p-5 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-premium/70">Interaktiv namuna</p>
                  <h2 className="text-2xl font-bold text-premium">169-modda</h2>
                </div>
                <BookOpenCheck className="h-9 w-9 text-legal-emerald" />
              </div>
              <div className="rounded-xl border border-border bg-card p-5 text-card-foreground">
                <p className="text-sm font-semibold text-legal-emerald">O‘g‘rilik</p>
                <p className="mt-3 text-2xl font-bold text-premium">Birovning narsasini yashirincha olish.</p>
                <p className="mt-4 leading-7 text-muted-foreground">5 yoshli bola uchun: so‘ramasdan olib ketish — mumkin emas. Avval ruxsat so‘rash kerak.</p>
                <div className="mt-5 rounded-lg bg-secondary p-4 text-sm text-secondary-foreground">
                  Misol: telefonni egasi ko‘rmayotganda olib ketish.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-legal-emerald">Kodeks xaritasi</p>
            <h2 className="mt-2 text-4xl font-bold text-premium">302 modda bo‘limlarga ajratilgan</h2>
          </div>
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-card p-3 shadow-premium">
            <div className="absolute inset-y-0 left-0 w-20 animate-shimmer bg-gradient-to-r from-transparent via-legal-gold/20 to-transparent" />
            <div className="flex items-center gap-3 text-muted-foreground">
              <Search className="h-5 w-5" /> Modda raqami, jinoyat nomi yoki kalit so‘z
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => {
            const Icon = chapter.icon;
            return (
              <article key={chapter.title} className="premium-card group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div className="mb-6 flex items-start justify-between">
                  <div className="rounded-lg bg-premium p-3 text-premium-foreground"><Icon className="h-5 w-5" /></div>
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">{chapter.range}</span>
                </div>
                <h3 className="text-2xl font-bold text-premium">{chapter.title}</h3>
                <p className="mt-3 text-muted-foreground">{chapter.tone} bo‘yicha sodda izohlar, bolacha tushuntirish va real misollar.</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/70 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-legal-emerald">Namuna format</p>
            <h2 className="mt-2 text-4xl font-bold text-premium">Har modda 3 qatlamda tushuntiriladi</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {sampleArticles.map((article) => (
              <article key={article.number} className="rounded-2xl border bg-card p-6 shadow-premium transition-all duration-300 hover:-translate-y-1">
                <p className="text-sm font-bold text-legal-emerald">{article.number}</p>
                <h3 className="mt-2 text-2xl font-bold text-premium">{article.title}</h3>
                <p className="mt-4 leading-7 text-card-foreground">{article.simple}</p>
                <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6 text-muted-foreground">{article.kid}</div>
                <div className="mt-4 border-l-4 border-legal-gold pl-4 text-sm leading-6 text-ink-soft">{article.example}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-legal-emerald">Oliy sud Plenumi</p>
          <h2 className="mt-2 text-4xl font-bold text-premium">Qarorlar murakkab emas — yo‘l xaritasi</h2>
          <p className="mt-5 leading-8 text-muted-foreground">Plenum qarorlari sud amaliyotini tushuntiradi. Saytda ular “nima dedi?”, “oddiy ma’nosi nima?”, “misolda qanday?” formatida beriladi.</p>
        </div>
        <div className="space-y-4">
          {plenumItems.map((item, index) => (
            <div key={item} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-premium">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-premium text-premium-foreground">{index + 1}</div>
              <div>
                <CheckCircle2 className="mb-2 h-5 w-5 text-legal-emerald" />
                <p className="text-lg font-semibold text-card-foreground">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}