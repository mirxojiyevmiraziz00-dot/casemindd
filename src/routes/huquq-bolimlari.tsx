import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { legalAreas } from "@/lib/casemind-data";

export const Route = createFileRoute("/huquq-bolimlari")({ head: () => ({ meta: [{ title: "Huquq bo‘limlari — CaseMind" }] }), component: LegalAreasPage });
function LegalAreasPage() { return <CaseMindShell><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><p className="text-sm font-semibold uppercase text-accent">Legal fields</p><h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Huquq bo‘limlari</h1><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{legalAreas.map((area) => { const Icon = area.icon; return <Link key={area.slug} to="/ai-tahlil" className="premium-card group rounded-2xl border p-6 shadow-premium transition hover:-translate-y-1"><Icon className="mb-5 h-8 w-8 text-accent" /><h2 className="text-2xl font-black text-foreground">{area.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{area.tone}</p><span className="mt-6 flex items-center gap-2 text-sm font-bold text-accent">Tahlil qilish <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>; })}</div></section></CaseMindShell>; }
