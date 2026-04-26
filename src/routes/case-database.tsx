import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { caseDatabase } from "@/lib/casemind-data";

export const Route = createFileRoute("/case-database")({
  head: () => ({ meta: [{ title: "Xalqaro Case Database — CaseMind" }, { name: "description", content: "Real sud ishlari, precedentlar va o‘xshash vaziyatlarni qidirish." }] }),
  component: CaseDatabasePage,
});

function CaseDatabasePage() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [area, setArea] = useState("all");
  const filtered = useMemo(() => caseDatabase.filter((item) => {
    const matchesQuery = `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (country === "all" || item.country === country) && (area === "all" || item.area === area);
  }), [query, country, area]);

  return (
    <CaseMindShell>
      <section className="legal-grid px-5 py-16 sm:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase text-accent">Precedent intelligence</p><h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Xalqaro Case Database</h1><p className="mt-5 max-w-3xl leading-8 text-muted-foreground">Real sud ishlari, mashhur precedentlar va o‘xshash vaziyatlarni davlat va huquq sohasi bo‘yicha toping.</p></div></section>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-3 rounded-2xl border bg-card p-4 shadow-premium md:grid-cols-[1fr_220px_220px]">
          <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Case, precedent yoki kalit so‘z..." className="bg-background pl-10" /></div>
          <Select value={country} onValueChange={setCountry}><SelectTrigger className="bg-background"><SelectValue placeholder="Davlat" /></SelectTrigger><SelectContent>{["all", "USA", "UK", "Germany", "UAE", "Uzbekistan", "EU"].map((item) => <SelectItem key={item} value={item}>{item === "all" ? "Barcha davlatlar" : item}</SelectItem>)}</SelectContent></Select>
          <Select value={area} onValueChange={setArea}><SelectTrigger className="bg-background"><SelectValue placeholder="Soha" /></SelectTrigger><SelectContent>{["all", "Jinoyat", "Fuqarolik", "Biznes", "Kiber", "Konstitutsiyaviy"].map((item) => <SelectItem key={item} value={item}>{item === "all" ? "Barcha sohalar" : item}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {filtered.map((item) => <article key={item.title} className="rounded-2xl border bg-card p-6 shadow-premium transition hover:-translate-y-1"><div className="flex items-center justify-between"><span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">{item.country} · {item.area}</span><span className="text-sm font-bold text-accent">{item.risk}</span></div><h2 className="mt-5 text-2xl font-black text-foreground">{item.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{item.summary}</p><div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">#{tag}</span>)}</div><Button className="mt-6" variant="legal" asChild><Link to="/ai-tahlil">O‘xshash vaziyatni topish <ArrowRight className="h-4 w-4" /></Link></Button></article>)}
        </div>
      </section>
    </CaseMindShell>
  );
}
