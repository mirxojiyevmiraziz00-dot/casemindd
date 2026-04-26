import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Globe2, Play, Scale, ShieldCheck, Sparkles } from "lucide-react";

import heroImage from "@/assets/casemind-global-justice.jpg";
import { AiCaseAnalyzer } from "@/components/AiCaseAnalyzer";
import { CaseMindShell } from "@/components/CaseMindShell";
import { AiLegalAssistant } from "@/components/AiLegalAssistant";
import { Button } from "@/components/ui/button";
import { countries, featureCards, legalAreas, pricingPlans, quickActions, stats, testimonials } from "@/lib/casemind-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CaseMind — Global legal-tech platforma" },
      { name: "description", content: "CaseMind AI orqali O‘zbekiston va xalqaro huquqiy tajriba asosida vaziyat tahlili, case database va yurist konsultatsiyasi." },
      { property: "og:title", content: "CaseMind — Global legal-tech platforma" },
      { property: "og:description", content: "Har qanday huquqiy vaziyat uchun global aqlli yechim." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CaseMindShell>
      <section className="relative min-h-[calc(100vh-76px)] overflow-hidden">
        <img src={heroImage} alt="CaseMind global justice legal technology" width={1600} height={960} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/20" />
        <div className="absolute inset-0 legal-grid opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="animate-reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent" /> Unicorn startup darajasidagi legal intelligence
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-tight text-foreground sm:text-6xl lg:text-7xl">
              Har qanday huquqiy vaziyat uchun global aqlli yechim
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Muammoingizni yozing va O‘zbekiston hamda xorijiy huquqiy tajribalar asosida tahlil oling.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="premium" size="lg" asChild><Link to="/ai-tahlil">Vaziyatni tahlil qilish <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button variant="legal" size="lg" asChild><Link to="/case-database">Xalqaro tajribalarni ko‘rish</Link></Button>
              <Button variant="legal" size="lg" asChild><Link to="/yurist-bilan-boglanish">Mutaxassis bilan bog‘lanish</Link></Button>
            </div>
          </div>
          <div className="animate-float rounded-2xl border bg-card/86 p-5 shadow-premium backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-muted-foreground">Live legal command center</p><h2 className="text-3xl font-black text-foreground">CaseMind AI</h2></div>
              <Scale className="h-10 w-10 text-accent" />
            </div>
            <div className="mt-6 grid gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.to} to={action.to} className="group flex items-center justify-between rounded-xl border bg-background/80 p-4 transition hover:-translate-y-0.5 hover:bg-secondary">
                    <span className="flex items-center gap-3"><Icon className="h-5 w-5 text-accent" /> {action.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:px-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border bg-card p-6 shadow-premium">
            <p className="text-4xl font-black text-accent">{stat.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl"><p className="text-sm font-semibold uppercase text-accent">Qanday ishlaydi</p><h2 className="mt-2 text-4xl font-black text-foreground">3 bosqichda huquqni qulaylashtiramiz</h2></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {["Vaziyatni yozing yoki fayl yuboring", "AI global huquqiy xaritani tuzadi", "PDF report va keyingi qadamlarni oling"].map((step, index) => (
              <article key={step} className="rounded-2xl border bg-card p-6 shadow-premium">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">{index + 1}</div>
                <h3 className="text-2xl font-black text-foreground">{step}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">O‘zbekiston, AQSH, UK, EU, Turkiya va boshqa yurisdiksiyalar bo‘yicha yo‘nalish.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AiCaseAnalyzer />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold uppercase text-accent">Huquq bo‘limlari</p><h2 className="mt-2 text-4xl font-black text-foreground">Barcha asosiy yo‘nalishlar</h2></div>
          <Button variant="legal" asChild><Link to="/huquq-bolimlari">Hammasini ko‘rish</Link></Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {legalAreas.slice(0, 9).map((area) => {
            const Icon = area.icon;
            return <Link key={area.slug} to="/huquq-bolimlari" className="premium-card group rounded-2xl border p-6 transition hover:-translate-y-1"><Icon className="mb-5 h-7 w-7 text-accent" /><h3 className="text-2xl font-black text-foreground">{area.title}</h3><p className="mt-3 text-muted-foreground">{area.tone}</p></Link>;
          })}
        </div>
      </section>

      <section className="bg-secondary/35 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase text-accent">Hamkor davlatlar</p><h2 className="mt-2 text-4xl font-black text-foreground">Global yurisdiksiyalar xaritasi</h2></div><Button variant="premium" asChild><Link to="/mamlakatlar"><Globe2 className="h-4 w-4" /> Mamlakatlar</Link></Button></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {countries.slice(0, 10).map((country) => <Link key={country.slug} to="/mamlakatlar/$countryId" params={{ countryId: country.slug }} className="rounded-2xl border bg-card p-5 shadow-premium transition hover:-translate-y-1"><span className="text-4xl">{country.flag}</span><h3 className="mt-4 text-xl font-black text-foreground">{country.name}</h3><p className="mt-2 text-sm text-muted-foreground">{country.region}</p></Link>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-4">
          {featureCards.map((feature) => { const Icon = feature.icon; return <article key={feature.title} className="rounded-2xl border bg-card p-6 shadow-premium"><Icon className="mb-5 h-7 w-7 text-accent" /><h3 className="text-xl font-black text-foreground">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.text}</p></article>; })}
        </div>
      </section>

      <AiLegalAssistant />

      <section className="bg-secondary/35 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div><p className="text-sm font-semibold uppercase text-accent">Fikrlar va tariflar</p><h2 className="mt-2 text-4xl font-black text-foreground">Professional foydalanuvchilar uchun</h2><Button className="mt-6" variant="premium" asChild><Link to="/pricing">To‘lov sahifasi</Link></Button></div>
            <div className="grid gap-4 md:grid-cols-3">
              {pricingPlans.map((plan) => <article key={plan.name} className="rounded-2xl border bg-card p-6 shadow-premium"><h3 className="text-2xl font-black text-foreground">{plan.name}</h3><p className="mt-3 text-4xl font-black text-accent">{plan.price}</p><div className="mt-5 space-y-2">{plan.features.map((feature) => <p key={feature} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-accent" /> {feature}</p>)}</div><Button className="mt-6 w-full" variant="legal" asChild><Link to="/pricing">{plan.cta}</Link></Button></article>)}
            </div>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => <article key={item.name} className="rounded-2xl border bg-card p-6 shadow-premium"><p className="leading-7 text-muted-foreground">“{item.quote}”</p><p className="mt-5 font-bold text-foreground">{item.name}</p><p className="text-sm text-accent">{item.role}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="rounded-3xl border bg-card p-8 shadow-premium lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div><Play className="mb-5 h-10 w-10 text-accent" /><h2 className="text-4xl font-black text-foreground">Insoniyat nihoyat huquqni ham qulaylashtirsin.</h2><p className="mt-4 leading-8 text-muted-foreground">CaseMind huquqiy savodxonlik, xalqaro tajriba va AI tahlilni bitta production-ready platformaga jamlaydi.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="premium" size="lg" asChild><Link to="/ai-tahlil">Hozir boshlash</Link></Button>
              <Button variant="legal" size="lg" asChild><Link to="/academy">Academy</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </CaseMindShell>
  );
}
