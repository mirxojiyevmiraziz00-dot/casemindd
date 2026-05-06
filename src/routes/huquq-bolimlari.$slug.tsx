import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bot, BookOpen, ExternalLink } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { caseDatabase, legalAreas } from "@/lib/casemind-data";

export const Route = createFileRoute("/huquq-bolimlari/$slug")({
  loader: ({ params }) => {
    const area = legalAreas.find((a) => a.slug === params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.area.title ?? "Huquq bo‘limi"} — CaseMind` },
    { name: "description", content: loaderData?.area.description ?? "" },
  ] }),
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();
  const Icon = area.icon;
  const cases = area.caseSlugs.length
    ? caseDatabase.filter((c) => area.caseSlugs.includes(c.slug))
    : caseDatabase.filter((c) => c.area.toLowerCase().startsWith(area.title.split(" ")[0].toLowerCase())).slice(0, 3);

  const queueAi = (text: string) => window.localStorage.setItem("casemind-ai-prompt", text);

  return (
    <CaseMindShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Button variant="legal" asChild><Link to="/huquq-bolimlari"><ArrowLeft className="h-4 w-4" /> Bo‘limlar</Link></Button>
        <div className="mt-8 flex items-start gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-card text-accent shadow-premium"><Icon className="h-8 w-8" /></div>
          <div>
            <p className="text-sm font-semibold uppercase text-accent">Legal field</p>
            <h1 className="text-5xl font-black text-foreground sm:text-6xl">{area.title}</h1>
            <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{area.description}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="rounded-2xl border bg-card p-6 shadow-premium">
            <BookOpen className="mb-4 h-7 w-7 text-accent" />
            <h2 className="text-2xl font-black text-foreground">Rasmiy manbalar</h2>
            <div className="mt-4 space-y-2">
              {area.sources.map((s: { label: string; url: string }) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm text-foreground transition hover:bg-secondary">
                  <span>{s.label}</span><ExternalLink className="h-4 w-4 text-accent" />
                </a>
              ))}
            </div>
            <Button className="mt-5 w-full" variant="premium" asChild onClick={() => queueAi(`${area.title}: umumiy yo‘nalish va xalqaro tajriba bo‘yicha tahlil qilib bering. ${area.description}`)}>
              <Link to="/ai-tahlil"><Bot className="h-4 w-4" /> AI tahlil boshlash</Link>
            </Button>
          </aside>

          <div>
            <p className="text-sm font-semibold uppercase text-accent">Tegishli case’lar</p>
            <h2 className="mt-2 text-3xl font-black text-foreground">Ushbu bo‘lim bo‘yicha real holatlar</h2>
            <div className="mt-5 grid gap-4">
              {cases.length === 0 && <p className="text-muted-foreground">Tez orada tegishli case’lar qo‘shiladi.</p>}
              {cases.map((c) => (
                <article key={c.slug} className="cinematic-scan rounded-2xl border bg-card p-6 shadow-premium">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{c.country} · {c.risk}</span>
                  <h3 className="mt-4 text-2xl font-black text-foreground">{c.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{c.summary}</p>
                  <p className="mt-3 text-xs text-accent">Manba: {c.source}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button variant="premium" asChild onClick={() => queueAi(`${c.title}\n${c.facts}\n${c.comparison}`)}>
                      <Link to="/ai-tahlil"><Bot className="h-4 w-4" /> AI tahlil</Link>
                    </Button>
                    <Button variant="legal" asChild>
                      <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /> Manba</a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </CaseMindShell>
  );
}
