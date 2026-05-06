import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Request = {
  id: string; full_name: string; contact: string; situation: string;
  area: string | null; status: string; created_at: string; user_email: string | null;
};

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin paneli — CaseMind" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { setIsAdmin(false); setLoading(false); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      if (admin) {
        const { data } = await supabase.from("consultation_requests").select("*").order("created_at", { ascending: false });
        setRequests((data ?? []) as Request[]);
      }
      setLoading(false);
    })();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("consultation_requests").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setRequests((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success("Status yangilandi");
  };

  if (loading) return <CaseMindShell><div className="flex min-h-96 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-accent" /></div></CaseMindShell>;

  if (!isAdmin) {
    return <CaseMindShell><section className="mx-auto max-w-3xl px-5 py-24 text-center"><ShieldCheck className="mx-auto h-12 w-12 text-accent" /><h1 className="mt-5 text-4xl font-black text-foreground">Faqat admin uchun</h1><p className="mt-3 text-muted-foreground">Bu sahifani ko‘rish uchun admin huquqi kerak.</p><Button className="mt-6" variant="premium" asChild><Link to="/login">Kirish</Link></Button></section></CaseMindShell>;
  }

  return (
    <CaseMindShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase text-accent">Admin paneli</p>
        <h1 className="mt-3 text-5xl font-black text-foreground">Konsultatsiya so‘rovlari</h1>
        <p className="mt-3 text-muted-foreground">Jami: {requests.length}</p>
        <div className="mt-8 space-y-4">
          {requests.map((r) => (
            <article key={r.id} className="rounded-2xl border bg-card p-6 shadow-premium">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-foreground">{r.full_name}</h3>
                  <p className="text-sm text-accent">{r.contact}{r.user_email ? ` · ${r.user_email}` : ""}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${r.status === "new" ? "bg-accent/20 text-accent" : r.status === "done" ? "bg-legal-emerald/20 text-legal-emerald" : "bg-secondary text-muted-foreground"}`}>{r.status}</span>
              </div>
              <p className="mt-3 leading-7 text-muted-foreground">{r.situation}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="legal" size="sm" onClick={() => updateStatus(r.id, "in_progress")}>Jarayonda</Button>
                <Button variant="legal" size="sm" onClick={() => updateStatus(r.id, "done")}>Yopish</Button>
                <Button variant="legal" size="sm" asChild><a href={`mailto:${r.contact}`}>Email yozish</a></Button>
              </div>
            </article>
          ))}
          {requests.length === 0 && <p className="text-muted-foreground">Hozircha so‘rovlar yo‘q.</p>}
        </div>
      </section>
    </CaseMindShell>
  );
}
