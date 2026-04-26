import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenCheck, CircleHelp, PlayCircle, ScrollText } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/academy")({ head: () => ({ meta: [{ title: "Blog / Academy — CaseMind" }] }), component: AcademyPage });
function AcademyPage() { const items = ["Huquqiy maqolalar", "Chet el tajribalari", "Sud amaliyoti sharhlari", "Video darslar", "FAQ"]; return <CaseMindShell><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><p className="text-sm font-semibold uppercase text-accent">Blog / Academy</p><h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Huquqiy bilim markazi</h1><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => { const icons = [BookOpenCheck, ScrollText, ScrollText, PlayCircle, CircleHelp]; const Icon = icons[index]; return <article key={item} className="rounded-2xl border bg-card p-6 shadow-premium"><Icon className="mb-5 h-8 w-8 text-accent" /><h2 className="text-2xl font-black text-foreground">{item}</h2><p className="mt-3 leading-7 text-muted-foreground">CaseMind tahririyati va ekspertlaridan amaliy, xalqaro va sodda sharhlar.</p><Button className="mt-5" variant="legal" asChild><Link to="/ai-tahlil">O‘rganish</Link></Button></article>; })}</div></section></CaseMindShell>; }
