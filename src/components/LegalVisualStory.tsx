import { Fingerprint, Gavel, Scale, ShieldAlert } from "lucide-react";

const visualCards = [
  { title: "Dalil", text: "Har bir fakt tekshiriladi", icon: Fingerprint },
  { title: "Sud", text: "Qaror mantiq bilan izohlanadi", icon: Gavel },
  { title: "Jazo", text: "Holat va ayb darajasi baholanadi", icon: Scale },
];

export function LegalVisualStory() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-legal-emerald">Vizual sharh</p>
          <h2 className="mt-2 text-4xl font-bold text-premium">Jinoyat mavzusi rasmli va harakatli ko‘rinishda</h2>
          <p className="mt-5 leading-8 text-muted-foreground">
            Hujjatlar yuklangach, moddalar dalil, javobgarlik va sud amaliyoti bo‘yicha rasmli bloklar bilan tushunarli qilib ko‘rsatiladi.
          </p>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border bg-card p-6 shadow-premium">
          <div className="absolute inset-0 legal-grid opacity-30" />
          <div className="absolute left-8 top-8 flex h-20 w-20 animate-float items-center justify-center rounded-2xl border bg-premium text-premium-foreground shadow-glow">
            <ShieldAlert className="h-10 w-10 text-legal-gold" />
          </div>
          <div className="absolute right-8 top-10 h-28 w-28 rounded-full border border-legal-gold/40" />
          <div className="absolute bottom-8 left-1/2 h-40 w-48 -translate-x-1/2 rounded-t-full border-x border-t border-legal-gold/35 bg-secondary/70" />
          <div className="absolute bottom-8 left-1/2 h-4 w-64 -translate-x-1/2 rounded-md bg-premium" />
          <div className="relative ml-auto grid max-w-sm gap-3 pt-24">
            {visualCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="animate-reveal rounded-xl border bg-background/80 p-4 shadow-premium backdrop-blur"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-premium">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
