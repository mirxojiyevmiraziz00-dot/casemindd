import { createFileRoute } from "@tanstack/react-router";
import { Languages, Moon } from "lucide-react";
import { CaseMindShell } from "@/components/CaseMindShell";
export const Route = createFileRoute("/settings")({ component: () => <CaseMindShell><section className="mx-auto max-w-4xl px-5 py-16 sm:px-8"><Moon className="mb-5 h-10 w-10 text-accent" /><h1 className="text-5xl font-black text-foreground">Dark mode va tillar</h1><div className="mt-8 grid gap-4 sm:grid-cols-3">{["O‘zbek", "Русский", "English"].map((x) => <button key={x} className="rounded-2xl border bg-card p-6 text-left shadow-premium"><Languages className="mb-4 h-6 w-6 text-accent" />{x}</button>)}</div></section></CaseMindShell> });
