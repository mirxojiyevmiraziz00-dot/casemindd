import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Send } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/media")({
  head: () => ({ meta: [
    { title: "Media markaz — CaseMind" },
    { name: "description", content: "CaseMind Telegram, Instagram va Facebook kanallari — yangiliklar va video huquqiy kontent." },
  ] }),
  component: MediaPage,
});

function MediaPage() {
  return (
    <CaseMindShell>
      <section className="legal-grid px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-accent">Social legal studio</p>
          <h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Media markaz</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">CaseMind kanallari — bu yerda video tahlillar, qisqa explainer’lar va yangiliklar joylanadi. Ijtimoiy tarmoqlardagi profillarimizga obuna bo‘ling.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="cinematic-scan rounded-2xl border bg-card p-6 shadow-premium">
            <Send className="mb-5 h-10 w-10 text-accent" />
            <h2 className="text-2xl font-black text-foreground">Telegram kanal</h2>
            <p className="mt-3 text-muted-foreground">Yangiliklar, qisqa case tahlillari, hujjat shablonlari.</p>
            <Button className="mt-5" variant="premium" asChild><a href="https://t.me/mirxojiyev" target="_blank" rel="noopener noreferrer">@mirxojiyev</a></Button>
          </article>
          <article className="cinematic-scan rounded-2xl border bg-card p-6 shadow-premium">
            <Instagram className="mb-5 h-10 w-10 text-accent" />
            <h2 className="text-2xl font-black text-foreground">Instagram</h2>
            <p className="mt-3 text-muted-foreground">Video reels, premium legal visuals va sahna kadrlari.</p>
            <Button className="mt-5" variant="premium" asChild><a href="https://instagram.com/_miraziz.1" target="_blank" rel="noopener noreferrer">@_miraziz.1</a></Button>
          </article>
          <article className="cinematic-scan rounded-2xl border bg-card p-6 shadow-premium">
            <Facebook className="mb-5 h-10 w-10 text-accent" />
            <h2 className="text-2xl font-black text-foreground">Facebook</h2>
            <p className="mt-3 text-muted-foreground">Uzun postlar, e’lonlar va community.</p>
            <Button className="mt-5" variant="premium" asChild><a href="https://facebook.com/Ado.Vis" target="_blank" rel="noopener noreferrer">Ado.Vis</a></Button>
          </article>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-premium">
          <div className="border-b px-6 py-4">
            <h3 className="text-xl font-black text-foreground">Telegram kanal preview</h3>
            <p className="text-sm text-muted-foreground">Eng so‘nggi postlar to‘g‘ridan-to‘g‘ri Telegram’dan</p>
          </div>
          <iframe
            title="Telegram CaseMind"
            src="https://t.me/s/mirxojiyev"
            className="h-[640px] w-full border-0 bg-background"
            loading="lazy"
          />
        </div>
      </section>
    </CaseMindShell>
  );
}
