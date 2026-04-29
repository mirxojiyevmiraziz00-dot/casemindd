import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Bot, ExternalLink, Gavel, Landmark, Scale } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { countries, getCountryCases } from "@/lib/casemind-data";

export const Route = createFileRoute("/mamlakatlar/$countryId")({
  loader: ({ params }) => {
    const country = countries.find((item) => item.slug === params.countryId);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.country.name ?? "Mamlakat"} — CaseMind` }] }),
  component: CountryPage,
});
function CountryPage() { const { country } = Route.useLoaderData(); const blocks = [{ icon: BookOpen, title: "Asosiy qonunlar", text: country.laws }, { icon: Landmark, title: "Sud tizimi", text: country.courts }, { icon: Gavel, title: "Mashhur precedentlar", text: country.precedents }, { icon: Scale, title: "Huquqiy madaniyat", text: country.culture }, { icon: Scale, title: "Muammo hal qilish usullari", text: country.resolution }]; const countryCases = getCountryCases(country.name); const queueAi = (text: string) => window.localStorage.setItem("casemind-ai-prompt", text); return <CaseMindShell><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><Button variant="legal" asChild><Link to="/mamlakatlar"><ArrowLeft className="h-4 w-4" /> Mamlakatlar</Link></Button><div className="mt-10"><span className="text-6xl">{country.flag}</span><h1 className="mt-5 text-5xl font-black text-foreground sm:text-6xl">{country.name}</h1><p className="mt-4 text-xl text-accent">{country.region}</p></div><div className="mt-10 grid gap-5 md:grid-cols-2">{blocks.map((block) => <article key={block.title} className="rounded-2xl border bg-card p-6 shadow-premium"><block.icon className="mb-5 h-7 w-7 text-accent" /><h2 className="text-2xl font-black text-foreground">{block.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{block.text}</p></article>)}</div><div className="mt-14"><p className="text-sm font-semibold uppercase text-accent">Tegishli case’lar</p><h2 className="mt-2 text-4xl font-black text-foreground">{country.name} bo‘yicha amaliy holatlar</h2><div className="mt-6 grid gap-5 lg:grid-cols-3">{countryCases.map((item) => <article key={item.title} className="cinematic-scan rounded-2xl border bg-card p-6 shadow-premium"><span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{item.area} · {item.risk}</span><h3 className="mt-5 text-2xl font-black text-foreground">{item.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{item.summary}</p><p className="mt-4 text-xs text-accent">Manba: {item.source}</p><div className="mt-5 flex flex-col gap-2"><Button variant="premium" asChild onClick={() => queueAi(`${country.name}: ${item.title}\n${item.facts}\n${item.comparison}`)}><Link to="/ai-tahlil"><Bot className="h-4 w-4" /> AI tahlil qilish</Link></Button><Button variant="legal" asChild><Link to="/case-database"><ExternalLink className="h-4 w-4" /> Database’da ko‘rish</Link></Button></div></article>)}</div></div></section></CaseMindShell>; }
