import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, MessageCircle, Video, UsersRound } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/yurist-bilan-boglanish")({ head: () => ({ meta: [{ title: "Yurist bilan bog‘lanish — CaseMind" }] }), component: LawyerContactPage });
function LawyerContactPage() { const services = [{ icon: MessageCircle, title: "Online konsultatsiya" }, { icon: Video, title: "Video call" }, { icon: UsersRound, title: "Chat" }, { icon: CalendarClock, title: "Vaqt bron qilish" }]; return <CaseMindShell><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><p className="text-sm font-semibold uppercase text-accent">Professional support</p><h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Yurist bilan bog‘lanish</h1><div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div className="grid gap-4 sm:grid-cols-2">{services.map((service) => <article key={service.title} className="rounded-2xl border bg-card p-6 shadow-premium"><service.icon className="mb-5 h-8 w-8 text-accent" /><h2 className="text-2xl font-black text-foreground">{service.title}</h2><Button className="mt-5" variant="legal" asChild><Link to="/dashboard">Tanlash</Link></Button></article>)}</div><form className="premium-card rounded-2xl border p-6 shadow-premium"><h2 className="text-3xl font-black text-foreground">Konsultatsiya so‘rovi</h2><div className="mt-6 grid gap-4"><Input placeholder="Ismingiz" className="bg-background" /><Input placeholder="Email yoki telefon" className="bg-background" /><Textarea placeholder="Vaziyatingizni qisqacha yozing" className="min-h-36 bg-background" /><Button variant="premium" type="button">So‘rov yuborish</Button></div></form></div></section></CaseMindShell>; }
