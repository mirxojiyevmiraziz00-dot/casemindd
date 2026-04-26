import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2 } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { countries } from "@/lib/casemind-data";

export const Route = createFileRoute("/mamlakatlar")({ head: () => ({ meta: [{ title: "Mamlakatlar — CaseMind" }] }), component: CountriesPage });
function CountriesPage() { return <CaseMindShell><section className="legal-grid px-5 py-16 sm:px-8"><div className="mx-auto max-w-7xl"><Globe2 className="mb-5 h-10 w-10 text-accent" /><h1 className="text-5xl font-black text-foreground sm:text-6xl">Mamlakatlar bo‘limi</h1><p className="mt-5 max-w-3xl leading-8 text-muted-foreground">Har bir davlatda asosiy qonunlar, sud tizimi, precedentlar, huquqiy madaniyat va muammo hal qilish usullari.</p></div></section><section className="mx-auto max-w-7xl px-5 py-12 sm:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{countries.map((country) => <Link key={country.slug} to="/mamlakatlar/$countryId" params={{ countryId: country.slug }} className="rounded-2xl border bg-card p-6 shadow-premium transition hover:-translate-y-1"><span className="text-5xl">{country.flag}</span><h2 className="mt-5 text-3xl font-black text-foreground">{country.name}</h2><p className="mt-2 text-accent">{country.region}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{country.laws}</p><span className="mt-6 flex items-center gap-2 text-sm font-bold text-accent">Alohida sahifa <ArrowRight className="h-4 w-4" /></span></Link>)}</div></section></CaseMindShell>; }
