import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Gavel, Landmark, Scale } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { countries } from "@/lib/casemind-data";

export const Route = createFileRoute("/mamlakatlar/$countryId")({
  loader: ({ params }) => {
    const country = countries.find((item) => item.slug === params.countryId);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.country.name ?? "Mamlakat"} — CaseMind` }] }),
  component: CountryPage,
});
function CountryPage() { const { country } = Route.useLoaderData(); const blocks = [{ icon: BookOpen, title: "Asosiy qonunlar", text: country.laws }, { icon: Landmark, title: "Sud tizimi", text: country.courts }, { icon: Gavel, title: "Mashhur precedentlar", text: country.precedents }, { icon: Scale, title: "Huquqiy madaniyat", text: country.culture }, { icon: Scale, title: "Muammo hal qilish usullari", text: country.resolution }]; return <CaseMindShell><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><Button variant="legal" asChild><Link to="/mamlakatlar"><ArrowLeft className="h-4 w-4" /> Mamlakatlar</Link></Button><div className="mt-10"><span className="text-6xl">{country.flag}</span><h1 className="mt-5 text-5xl font-black text-foreground sm:text-6xl">{country.name}</h1><p className="mt-4 text-xl text-accent">{country.region}</p></div><div className="mt-10 grid gap-5 md:grid-cols-2">{blocks.map((block) => <article key={block.title} className="rounded-2xl border bg-card p-6 shadow-premium"><block.icon className="mb-5 h-7 w-7 text-accent" /><h2 className="text-2xl font-black text-foreground">{block.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{block.text}</p></article>)}</div></section></CaseMindShell>; }
