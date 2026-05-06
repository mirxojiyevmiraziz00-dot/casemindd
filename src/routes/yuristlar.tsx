import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Mail, MessageCircle, Phone, Send, Star, UserRound } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

type Lawyer = {
  id: string; full_name: string; photo_url: string | null;
  areas: string[]; languages: string[]; bio: string; city: string | null;
  rating: number | null; experience_years: number | null;
  contact_email: string | null; contact_phone: string | null; telegram: string | null;
};

export const Route = createFileRoute("/yuristlar")({
  head: () => ({ meta: [
    { title: "Yuristlar bazasi — CaseMind" },
    { name: "description", content: "Tasdiqlangan yuristlar — soha va til bo‘yicha qidiring, to‘g‘ridan-to‘g‘ri bog‘laning." },
  ] }),
  component: LawyersPage,
});

function LawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");

  useEffect(() => {
    void supabase.from("lawyers").select("*").eq("is_active", true).order("rating", { ascending: false })
      .then(({ data }) => { setLawyers((data ?? []) as Lawyer[]); setLoading(false); });
  }, []);

  const allAreas = useMemo(() => Array.from(new Set(lawyers.flatMap((l) => l.areas))), [lawyers]);
  const filtered = useMemo(() => lawyers.filter((l) => {
    const matchQ = `${l.full_name} ${l.bio} ${l.areas.join(" ")} ${l.city ?? ""}`.toLowerCase().includes(query.toLowerCase());
    const matchA = area === "all" || l.areas.includes(area);
    return matchQ && matchA;
  }), [lawyers, query, area]);

  return (
    <CaseMindShell>
      <section className="legal-grid px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-accent">Verified counsel network</p>
          <h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Yuristlar bazasi</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">Tajribali yuristlarni soha, til va shahar bo‘yicha tanlang. Har birining profiliga kirib, to‘g‘ridan-to‘g‘ri bog‘lanishingiz mumkin.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-3 rounded-2xl border bg-card p-4 shadow-premium md:grid-cols-[1fr_240px]">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Qidiring: ism, soha, shahar..." className="bg-background" />
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger className="bg-background"><SelectValue placeholder="Soha" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha sohalar</SelectItem>
              {allAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="mt-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-accent" /></div>
        ) : filtered.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">Yurist topilmadi.</p>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {filtered.map((l) => (
              <article key={l.id} className="cinematic-scan rounded-2xl border bg-card p-6 shadow-premium transition hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-secondary">
                    {l.photo_url ? <img src={l.photo_url} alt={l.full_name} className="h-full w-full rounded-full object-cover" /> : <UserRound className="h-7 w-7 text-accent" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">{l.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{l.city} · {l.experience_years} yil tajriba</p>
                    <div className="mt-1 flex items-center gap-1 text-accent"><Star className="h-4 w-4 fill-current" /> <span className="text-sm font-bold">{l.rating?.toFixed(1)}</span></div>
                  </div>
                </div>
                <p className="mt-4 line-clamp-3 leading-7 text-muted-foreground">{l.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {l.areas.slice(0, 3).map((a) => <span key={a} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">{a}</span>)}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {l.contact_email && <Button variant="legal" size="sm" asChild><a href={`mailto:${l.contact_email}`}><Mail className="h-4 w-4" /> Email</a></Button>}
                  {l.contact_phone && <Button variant="legal" size="sm" asChild><a href={`tel:${l.contact_phone}`}><Phone className="h-4 w-4" /> Qo‘ng‘iroq</a></Button>}
                  {l.telegram && <Button variant="legal" size="sm" asChild><a href={`https://t.me/${l.telegram}`} target="_blank" rel="noopener noreferrer"><Send className="h-4 w-4" /> Telegram</a></Button>}
                  <Button variant="premium" size="sm" asChild>
                    <Link to="/yurist-bilan-boglanish" search={{ lawyer: l.id } as never}><MessageCircle className="h-4 w-4" /> So‘rov</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </CaseMindShell>
  );
}
