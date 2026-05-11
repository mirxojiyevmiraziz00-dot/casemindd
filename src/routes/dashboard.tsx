import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, Bell, FileText, GitCompareArrows, Loader2, MessageSquare, Sparkles, UserRound } from "lucide-react";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "User Dashboard — CaseMind" }] }),
  component: DashboardPage,
});

type Stats = {
  history: number;
  requests: number;
  email: string | null;
  loading: boolean;
  authed: boolean;
  recent: Array<{ id: string; title: string; area: string | null; created_at: string }>;
};

function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    history: 0,
    requests: 0,
    email: null,
    loading: true,
    authed: false,
    recent: [],
  });

  useEffect(() => {
    void (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        setStats((s) => ({ ...s, loading: false, authed: false }));
        return;
      }
      const [{ count: historyCount }, { count: requestsCount }, { data: recent }] = await Promise.all([
        supabase.from("case_history").select("*", { count: "exact", head: true }).eq("user_id", u.user.id),
        supabase.from("consultation_requests").select("*", { count: "exact", head: true }).eq("user_id", u.user.id),
        supabase.from("case_history").select("id, title, area, created_at").eq("user_id", u.user.id).order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        history: historyCount ?? 0,
        requests: requestsCount ?? 0,
        email: u.user.email ?? null,
        loading: false,
        authed: true,
        recent: (recent ?? []) as Stats["recent"],
      });
    })();
  }, []);

  const widgets = [
    { icon: FileText, title: "Saqlangan tahlillar", value: stats.history.toString(), tone: "AI orqali yaratilgan" },
    { icon: MessageSquare, title: "Konsultatsiya so‘rovlari", value: stats.requests.toString(), tone: "Yuristga yuborilgan" },
    { icon: BarChart3, title: "Faollik darajasi", value: stats.history >= 5 ? "Pro user" : stats.history >= 1 ? "Active" : "Yangi", tone: "Tarix asosida" },
    { icon: GitCompareArrows, title: "Taqqoslash quvvati", value: "Cheksiz", tone: "Premium funksiya" },
    { icon: UserRound, title: "Profil", value: stats.email ?? "Mehmon", tone: stats.authed ? "Faol akkaunt" : "Kiring" },
    { icon: Bell, title: "Bildirishnomalar", value: "0 yangi", tone: "Sozlashlar > Notification" },
  ];

  return (
    <CaseMindShell>
      <section className="legal-grid px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-accent">User Dashboard</p>
          <h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Shaxsiy <span className="gradient-text">huquqiy markaz</span></h1>
          <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
            {stats.authed ? `Xush kelibsiz, ${stats.email}. Quyida sizning real faolligingiz.` : "Tizimga kiring — barcha tahlillar va so‘rovlar saqlanib boradi."}
          </p>

          {stats.loading ? (
            <div className="mt-10 flex items-center gap-3 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin text-accent" /> Yuklanmoqda…</div>
          ) : !stats.authed ? (
            <div className="mt-8 rounded-2xl border bg-card p-6 shadow-premium">
              <p className="text-foreground">Tahlil tarixingizni ko‘rish uchun avval tizimga kiring.</p>
              <div className="mt-5 flex gap-3">
                <Button variant="premium" asChild><Link to="/login">Kirish</Link></Button>
                <Button variant="legal" asChild><Link to="/ai-tahlil">Tahlil boshlash</Link></Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-5 stagger md:grid-cols-2 lg:grid-cols-3">
                {widgets.map((item) => (
                  <article key={item.title} className="hover-lift rounded-2xl border bg-card p-6 shadow-premium">
                    <item.icon className="mb-5 h-8 w-8 text-accent" />
                    <h2 className="text-xl font-black text-foreground">{item.title}</h2>
                    <p className="mt-3 text-2xl font-black text-accent">{item.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.tone}</p>
                  </article>
                ))}
                <article className="hover-lift rounded-2xl border accent-ring bg-card p-6">
                  <Sparkles className="mb-5 h-8 w-8 text-accent" />
                  <h2 className="text-xl font-black text-foreground">Premium obuna</h2>
                  <p className="mt-3 text-muted-foreground">PDF report, case compare va priority konsultatsiya.</p>
                  <Button className="mt-5" variant="premium" asChild><Link to="/pricing">Premium olish</Link></Button>
                </article>
              </div>

              <div className="mt-10 rounded-2xl border bg-card p-6 shadow-premium">
                <h2 className="text-2xl font-black text-foreground">Oxirgi tahlillar</h2>
                {stats.recent.length === 0 ? (
                  <p className="mt-4 text-muted-foreground">Hali tahlil yo‘q. <Link to="/ai-tahlil" className="text-accent underline">Birinchi tahlilni boshlang →</Link></p>
                ) : (
                  <ul className="mt-5 divide-y">
                    {stats.recent.map((r) => (
                      <li key={r.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-bold text-foreground">{r.title}</p>
                          <p className="text-sm text-muted-foreground">{r.area ?? "Umumiy"} · {new Date(r.created_at).toLocaleDateString()}</p>
                        </div>
                        <Button size="sm" variant="legal" asChild><Link to="/ai-tahlil">Davom etish</Link></Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </CaseMindShell>
  );
}
