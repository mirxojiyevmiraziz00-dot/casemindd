import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, Loader2, MessageCircle, Send, UsersRound, Video } from "lucide-react";
import { toast } from "sonner";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/yurist-bilan-boglanish")({ head: () => ({ meta: [{ title: "Yurist bilan bog‘lanish — CaseMind" }] }), component: LawyerContactPage });

function LawyerContactPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [situation, setSituation] = useState("");
  const [loading, setLoading] = useState(false);
  const services = [
    { icon: MessageCircle, title: "Online konsultatsiya" },
    { icon: Video, title: "Video call" },
    { icon: UsersRound, title: "Chat" },
    { icon: CalendarClock, title: "Vaqt bron qilish" },
  ];

  const submit = async () => {
    if (!name.trim() || !contact.trim() || !situation.trim()) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from("consultation_requests").insert({
      full_name: name, contact, situation, user_id: userData.user?.id ?? null,
    });
    setLoading(false);
    if (error) { toast.error("Yuborilmadi: " + error.message); return; }
    toast.success("So‘rovingiz qabul qilindi! Tez orada bog‘lanamiz.");
    setName(""); setContact(""); setSituation("");
  };

  return (
    <CaseMindShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase text-accent">Professional support</p>
        <h1 className="mt-3 text-5xl font-black text-foreground sm:text-6xl">Yurist bilan bog‘lanish</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border bg-card p-6 shadow-premium">
                <service.icon className="mb-5 h-8 w-8 text-accent" />
                <h2 className="text-2xl font-black text-foreground">{service.title}</h2>
                <Button className="mt-5" variant="legal" asChild><Link to="/dashboard">Tanlash</Link></Button>
              </article>
            ))}
          </div>
          <div className="premium-card rounded-2xl border p-6 shadow-premium">
            <h2 className="text-3xl font-black text-foreground">Konsultatsiya so‘rovi</h2>
            <div className="mt-6 grid gap-4">
              <Input placeholder="Ismingiz" value={name} onChange={(e) => setName(e.target.value)} className="bg-background" />
              <Input placeholder="Email yoki telefon" value={contact} onChange={(e) => setContact(e.target.value)} className="bg-background" />
              <Textarea placeholder="Vaziyatingizni qisqacha yozing" value={situation} onChange={(e) => setSituation(e.target.value)} className="min-h-36 bg-background" />
              <Button variant="premium" type="button" onClick={submit} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} So‘rov yuborish
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CaseMindShell>
  );
}
