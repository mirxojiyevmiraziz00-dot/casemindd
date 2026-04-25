import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Jinoyat kodeksi oson sharh" },
      { name: "description", content: "Jinoyat kodeksi platformasiga email yoki Google orqali xavfsiz kirish." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/" });
    });
  }, [navigate]);

  const saveProfile = async (userId: string, userEmail: string | null) => {
    await supabase.from("profiles").upsert({
      user_id: userId,
      email: userEmail,
      display_name: displayName.trim() || userEmail || "Foydalanuvchi",
    }, { onConflict: "user_id" });
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName },
          },
        });

        if (signUpError) throw signUpError;
        if (data.user) await saveProfile(data.user.id, data.user.email ?? email);
        setMessage("Ro‘yxatdan o‘tish yuborildi. Emailingizni tasdiqlang, keyin login qiling.");
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        if (data.user) await saveProfile(data.user.id, data.user.email ?? email);
        await navigate({ to: "/" });
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Kirishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setError(result.error.message);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="legal-grid px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Button variant="legal" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" /> Bosh sahifa
            </Link>
          </Button>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-legal-emerald">Xavfsiz login</p>
              <h1 className="mt-3 text-5xl font-bold leading-tight text-premium">Hujjat yuklash uchun hisobga kiring</h1>
              <p className="mt-6 leading-8 text-muted-foreground">
                Login orqali Jinoyat kodeksi, inglizcha varianti va Plenum qarorlarini yuklab, hujjatlar bazasiga qo‘shishingiz mumkin.
              </p>
            </div>

            <form onSubmit={(event) => void submit(event)} className="premium-card rounded-2xl border p-6 shadow-premium">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-premium text-premium-foreground">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-premium">{mode === "login" ? "Kirish" : "Ro‘yxatdan o‘tish"}</h2>
                  <p className="text-sm text-muted-foreground">Email/parol yoki Google orqali</p>
                </div>
              </div>

              <div className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Ism</Label>
                    <Input id="name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="bg-background" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Parol</Label>
                  <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} className="bg-background" />
                </div>
              </div>

              {message && <p className="mt-4 rounded-xl border border-legal-emerald/30 bg-legal-emerald/10 p-4 text-sm text-card-foreground">{message}</p>}
              {error && <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-card-foreground">{error}</p>}

              <div className="mt-6 grid gap-3">
                <Button type="submit" variant="premium" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  {mode === "login" ? "Kirish" : "Hisob ochish"}
                </Button>
                <Button type="button" variant="legal" onClick={() => void signInWithGoogle()}>
                  Google orqali kirish
                </Button>
                <Button type="button" variant="ghost" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                  {mode === "login" ? "Yangi hisob ochish" : "Menda hisob bor"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
