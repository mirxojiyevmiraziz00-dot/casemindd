import { createFileRoute } from "@tanstack/react-router";
import { CaseMindShell } from "@/components/CaseMindShell";
export const Route = createFileRoute("/terms")({ component: () => <CaseMindShell><section className="mx-auto max-w-3xl px-5 py-16 sm:px-8"><h1 className="text-5xl font-black text-foreground">Terms of Use</h1><p className="mt-6 leading-8 text-muted-foreground">CaseMind AI huquqiy axborot va yo‘nalish beradi; yakuniy yuridik maslahat uchun malakali mutaxassis bilan bog‘laning.</p></section></CaseMindShell> });
