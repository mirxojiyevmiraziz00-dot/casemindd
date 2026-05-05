import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Bot, ExternalLink, Image, Loader2, Play, Search, X } from "lucide-react";

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
  const [selectedCase, setSelectedCase] = useState<(typeof caseDatabase)[number] | null>(null);
  const [visualUrl, setVisualUrl] = useState("");
  const [isVisualLoading, setIsVisualLoading] = useState(false);
  const filtered = useMemo(() => caseDatabase.filter((item) => {
    const matchesQuery = `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (country === "all" || item.country === country) && (area === "all" || item.area === area);
  }), [query, country, area]);
  const queueAi = (item: (typeof caseDatabase)[number]) => window.localStorage.setItem("casemind-ai-prompt", `${item.title}\n${item.facts}\n${item.comparison}\nKeyingi qadamlar: ${item.nextSteps.join(", ")}`);
  const openCase = (item: (typeof caseDatabase)[number]) => { setSelectedCase(item); setVisualUrl(""); };
  const generateCaseVisual = async () => {
    if (!selectedCase) return;
    setIsVisualLoading(true);
    try {
      const response = await fetch("/api/ai-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visual: true, messages: [{ role: "user", content: selectedCase.visualPrompt }] }) });
      const data = await response.json().catch(() => null);
      if (data?.imageUrl) setVisualUrl(data.imageUrl);
    } finally { setIsVisualLoading(false); }
  };

  return (
    <CaseMindShell>
      <section className="legal-grid px-5 py-16 sm:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase text-accent">Precedent intelligence</p><h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Xalqaro Case Database</h1><p className="mt-5 max-w-3xl leading-8 text-muted-foreground">Real sud ishlari, mashhur precedentlar va o‘xshash vaziyatlarni davlat va huquq sohasi bo‘yicha toping.</p></div></section>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-3 rounded-2xl border bg-card p-4 shadow-premium md:grid-cols-[1fr_220px_220px]">
          <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Case, precedent yoki kalit so‘z..." className="bg-background pl-10" /></div>
          <Select value={country} onValueChange={setCountry}><SelectTrigger className="bg-background"><SelectValue placeholder="Davlat" /></SelectTrigger><SelectContent>{["all", "USA", "UK", "Germany", "France", "UAE", "Turkey", "Japan", "South Korea", "Uzbekistan", "EU", "International"].map((item) => <SelectItem key={item} value={item}>{item === "all" ? "Barcha davlatlar" : item}</SelectItem>)}</SelectContent></Select>
          <Select value={area} onValueChange={setArea}><SelectTrigger className="bg-background"><SelectValue placeholder="Soha" /></SelectTrigger><SelectContent>{["all", "Jinoyat", "Fuqarolik", "Biznes", "Kiber", "Konstitutsiyaviy", "Mehnat"].map((item) => <SelectItem key={item} value={item}>{item === "all" ? "Barcha sohalar" : item}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {filtered.map((item) => <article key={item.title} className="group cinematic-scan rounded-2xl border bg-card p-6 shadow-premium transition hover:-translate-y-1"><div className="flex items-center justify-between"><span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">{item.country} · {item.area}</span><span className="text-sm font-bold text-accent">{item.risk}</span></div><h2 className="mt-5 text-2xl font-black text-foreground">{item.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{item.summary}</p><p className="mt-3 text-xs text-accent">Manba: {item.source}</p><div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">#{tag}</span>)}</div><div className="mt-6 flex flex-col gap-2 sm:flex-row"><Button variant="premium" onClick={() => openCase(item)}><BookOpenCheck className="h-4 w-4" /> Tafsilot</Button><Button variant="legal" asChild onClick={() => queueAi(item)}><Link to="/ai-tahlil"><Bot className="h-4 w-4" /> AI tahlil <ArrowRight className="h-4 w-4" /></Link></Button></div></article>)}
        </div>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-5 backdrop-blur-md" role="dialog" aria-modal="true">
            <div className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl border bg-card p-6 shadow-premium">
              <Button className="absolute right-4 top-4" variant="legal" size="icon" onClick={() => setSelectedCase(null)} aria-label="Yopish"><X className="h-4 w-4" /></Button>
              <div className="pr-12"><p className="text-sm font-semibold uppercase text-accent">{selectedCase.country} · {selectedCase.area} · {selectedCase.risk}</p><h2 className="mt-3 text-4xl font-black text-foreground">{selectedCase.title}</h2><p className="mt-4 leading-8 text-muted-foreground">{selectedCase.summary}</p></div>
              <div className="mt-6 grid gap-4 lg:grid-cols-2"><article className="rounded-xl border bg-background p-5"><h3 className="text-xl font-black text-foreground">Holat</h3><p className="mt-3 leading-7 text-muted-foreground">{selectedCase.facts}</p></article><article className="rounded-xl border bg-background p-5"><h3 className="text-xl font-black text-foreground">Global taqqoslash</h3><p className="mt-3 leading-7 text-muted-foreground">{selectedCase.comparison}</p></article></div>
              <div className="mt-4 rounded-xl border bg-secondary p-5"><h3 className="text-xl font-black text-foreground">Keyingi qadamlar</h3><div className="mt-3 grid gap-2 md:grid-cols-3">{selectedCase.nextSteps.map((step) => <p key={step} className="rounded-lg border bg-card p-3 text-sm text-muted-foreground">{step}</p>)}</div><div className="mt-4 flex flex-wrap gap-2"><Button variant="legal" asChild><a href={`https://scholar.google.com/scholar?q=${encodeURIComponent(selectedCase.title)}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /> Google Scholar manba</a></Button><Button variant="legal" asChild><a href={`https://www.google.com/search?q=${encodeURIComponent(selectedCase.title + " " + selectedCase.source + " full text")}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /> To‘liq matn qidirish</a></Button></div><p className="mt-3 text-xs text-muted-foreground">Manba: {selectedCase.source}</p></div>
              <div className="mt-4 overflow-hidden rounded-xl border bg-background p-5"><div className="relative min-h-52 overflow-hidden rounded-lg p-5"><div className="absolute inset-0 legal-grid opacity-30" />{visualUrl && <img src={visualUrl} alt="Case uchun AI visual" className="absolute inset-0 h-full w-full object-cover opacity-75" loading="lazy" />}<Play className="absolute right-4 top-4 h-9 w-9 animate-float text-accent" /><div className="relative bg-background/40 p-4 backdrop-blur"><p className="text-sm font-semibold uppercase text-accent">Case motion preview</p><h3 className="mt-2 text-2xl font-black text-foreground">Premium AI visual storyboard</h3><p className="mt-2 max-w-2xl text-muted-foreground">{selectedCase.visualPrompt}</p><div className="mt-4 flex flex-col gap-2 sm:flex-row"><Button variant="premium" onClick={generateCaseVisual} disabled={isVisualLoading}>{isVisualLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image className="h-4 w-4" />} Rasm yaratish</Button><Button variant="legal" asChild onClick={() => queueAi(selectedCase)}><Link to="/ai-tahlil"><Bot className="h-4 w-4" /> AI bilan tahlil qilish</Link></Button></div></div></div></div>
            </div>
          </div>
        )}
      </section>
    </CaseMindShell>
  );
}
