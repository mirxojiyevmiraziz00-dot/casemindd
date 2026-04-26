import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/casemind-data";

export const Route = createFileRoute("/pricing")({ head: () => ({ meta: [{ title: "Tariflar va to‘lov — CaseMind" }] }), component: PricingPage });
function PricingPage() { return <CaseMindShell><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><CreditCard className="mb-5 h-10 w-10 text-accent" /><h1 className="text-5xl font-black text-foreground sm:text-6xl">To‘lov sahifasi</h1><p className="mt-5 max-w-3xl leading-8 text-muted-foreground">Free, Pro va Team tariflari. To‘lov integratsiyasi keyingi bosqichda real checkoutga ulanadi.</p><div className="mt-10 grid gap-5 lg:grid-cols-3">{pricingPlans.map((plan) => <article key={plan.name} className="premium-card rounded-2xl border p-6 shadow-premium"><h2 className="text-3xl font-black text-foreground">{plan.name}</h2><p className="mt-4 text-5xl font-black text-accent">{plan.price}</p><div className="mt-6 space-y-3">{plan.features.map((feature) => <p key={feature} className="flex gap-2 text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-accent" /> {feature}</p>)}</div><Button className="mt-8 w-full" variant="premium" asChild><Link to="/dashboard">{plan.cta}</Link></Button></article>)}</div></section></CaseMindShell>; }
