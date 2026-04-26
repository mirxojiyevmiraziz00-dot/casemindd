import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { CaseMindShell } from "@/components/CaseMindShell";
export const Route = createFileRoute("/notifications")({ component: () => <CaseMindShell><section className="mx-auto max-w-4xl px-5 py-16 sm:px-8"><Bell className="mb-5 h-10 w-10 text-accent" /><h1 className="text-5xl font-black text-foreground">Notification system</h1><div className="mt-8 space-y-3">{["AI tahlil tayyor", "Yangi precedent qo‘shildi", "Konsultatsiya vaqti tasdiqlandi"].map((x) => <div key={x} className="rounded-2xl border bg-card p-5 shadow-premium">{x}</div>)}</div></section></CaseMindShell> });
