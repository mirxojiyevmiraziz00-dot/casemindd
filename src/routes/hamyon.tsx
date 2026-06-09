import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  CreditCard,
  Loader2,
  Plus,
  Trash2,
  Wallet,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/hamyon")({
  head: () => ({
    meta: [
      { title: "Hamyon — CaseMind" },
      {
        name: "description",
        content:
          "CaseMind'da topgan mukofotlaringizni hamyon orqali plastik kartangizga o'tkazing.",
      },
    ],
  }),
  component: HamyonPage,
});

type Wallet = {
  balance: number;
  total_earned: number;
  total_withdrawn: number;
};

type Card = {
  id: string;
  card_holder: string;
  last4: string;
  expiry_month: number;
  expiry_year: number;
  bank_name: string | null;
  is_default: boolean;
};

type Withdrawal = {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  card_id: string;
};

const formatSom = (n: number) =>
  new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: 2 }).format(n) + " so'm";

function HamyonPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // add card form
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [bankName, setBankName] = useState("");

  // withdraw form
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("");

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadAll = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const [w, c, wd] = await Promise.all([
        supabase.from("wallets").select("balance,total_earned,total_withdrawn").eq("user_id", user.id).maybeSingle(),
        supabase.from("payment_cards").select("*").eq("user_id", user.id).order("is_default", { ascending: false }),
        supabase.from("withdrawal_requests").select("id,amount,status,created_at,card_id").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
      ]);
      if (w.error) throw w.error;
      if (c.error) throw c.error;
      if (wd.error) throw wd.error;

      if (!w.data) {
        // create wallet if missing
        const ins = await supabase.from("wallets").insert({ user_id: user.id }).select("balance,total_earned,total_withdrawn").single();
        if (ins.error) throw ins.error;
        setWallet(ins.data as Wallet);
      } else {
        setWallet(w.data as Wallet);
      }
      setCards((c.data ?? []) as Card[]);
      setWithdrawals((wd.data ?? []) as Withdrawal[]);
      if (!selectedCardId && c.data && c.data.length > 0) {
        setSelectedCardId(c.data[0].id);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError("");
    setSuccess("");
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 12 || digits.length > 19) {
      setError("Karta raqami noto'g'ri");
      return;
    }
    const last4 = digits.slice(-4);
    const m = cardExpiry.match(/^(\d{2})\/(\d{2,4})$/);
    if (!m) {
      setError("Amal qilish muddati MM/YY formatida bo'lsin");
      return;
    }
    const month = parseInt(m[1], 10);
    let year = parseInt(m[2], 10);
    if (year < 100) year += 2000;
    if (!cardHolder.trim()) {
      setError("Karta egasi ismini kiriting");
      return;
    }

    const { error: insErr } = await supabase.from("payment_cards").insert({
      user_id: user.id,
      card_holder: cardHolder.trim(),
      last4,
      expiry_month: month,
      expiry_year: year,
      bank_name: bankName.trim() || null,
      is_default: cards.length === 0,
    });
    if (insErr) {
      setError(insErr.message);
      return;
    }
    setSuccess("Karta qo'shildi");
    setCardNumber("");
    setCardHolder("");
    setCardExpiry("");
    setBankName("");
    setShowCardForm(false);
    await loadAll();
  };

  const deleteCard = async (id: string) => {
    if (!confirm("Kartani o'chirilsinmi?")) return;
    const { error: e } = await supabase.from("payment_cards").delete().eq("id", id);
    if (e) {
      setError(e.message);
      return;
    }
    await loadAll();
  };

  const setDefault = async (id: string) => {
    if (!user) return;
    await supabase.from("payment_cards").update({ is_default: false }).eq("user_id", user.id);
    await supabase.from("payment_cards").update({ is_default: true }).eq("id", id);
    await loadAll();
  };

  const requestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !wallet) return;
    setError("");
    setSuccess("");
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0) {
      setError("Summani kiriting");
      return;
    }
    if (amount > Number(wallet.balance)) {
      setError("Hamyondagi mablag' yetarli emas");
      return;
    }
    if (!selectedCardId) {
      setError("Kartani tanlang");
      return;
    }

    const { error: insErr } = await supabase.from("withdrawal_requests").insert({
      user_id: user.id,
      card_id: selectedCardId,
      amount,
    });
    if (insErr) {
      setError(insErr.message);
      return;
    }
    // hold the funds locally — admin will mark approved/rejected
    const newBalance = Number(wallet.balance) - amount;
    const { error: upErr } = await supabase
      .from("wallets")
      .update({ balance: newBalance, total_withdrawn: Number(wallet.total_withdrawn) + amount })
      .eq("user_id", user.id);
    if (upErr) {
      setError(upErr.message);
      return;
    }
    setSuccess(`So'rov qabul qilindi. ${formatSom(amount)} kartaga o'tkazilmoqda.`);
    setWithdrawAmount("");
    await loadAll();
  };

  if (authLoading) {
    return (
      <CaseMindShell>
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-32">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      </CaseMindShell>
    );
  }

  if (!user) {
    return (
      <CaseMindShell>
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <Wallet className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-5 text-4xl font-black text-foreground">Hamyon</h1>
          <p className="mt-4 text-muted-foreground">
            Hamyoningizni ko'rish va plastik kartaga pul o'tkazish uchun avval tizimga kiring.
          </p>
          <Button asChild variant="premium" className="mt-6">
            <Link to="/login">Kirish</Link>
          </Button>
        </section>
      </CaseMindShell>
    );
  }

  return (
    <CaseMindShell>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex items-center gap-3">
          <Wallet className="h-9 w-9 text-accent" />
          <div>
            <p className="text-sm font-semibold uppercase text-accent">Mening hamyonim</p>
            <h1 className="text-4xl font-black text-foreground sm:text-5xl">Hamyon</h1>
          </div>
        </div>

        {/* Balance cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-gradient-to-br from-accent/20 to-card p-6 shadow-premium">
            <p className="text-sm text-muted-foreground">Joriy balans</p>
            <p className="mt-2 text-4xl font-black text-foreground">
              {wallet ? formatSom(Number(wallet.balance)) : "—"}
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">Jami topilgan</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {wallet ? formatSom(Number(wallet.total_earned)) : "—"}
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">Jami yechilgan</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {wallet ? formatSom(Number(wallet.total_withdrawn)) : "—"}
            </p>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-6 rounded-xl border border-legal-emerald/40 bg-legal-emerald/10 p-4 text-sm">
            {success}
          </p>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Cards */}
          <div className="rounded-2xl border bg-card p-6 shadow-premium">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-foreground">Plastik kartalar</h2>
              <Button variant="legal" size="sm" onClick={() => setShowCardForm((v) => !v)}>
                <Plus className="h-4 w-4" /> {showCardForm ? "Bekor qilish" : "Karta qo'shish"}
              </Button>
            </div>

            {showCardForm && (
              <form onSubmit={addCard} className="mb-5 space-y-3 rounded-xl border bg-background p-4">
                <div>
                  <Label htmlFor="cn">Karta raqami</Label>
                  <Input
                    id="cn"
                    inputMode="numeric"
                    placeholder="8600 1234 5678 9012"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Xavfsizlik uchun faqat oxirgi 4 raqam saqlanadi.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="ce">Amal qilish (MM/YY)</Label>
                    <Input id="ce" placeholder="12/28" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="bn">Bank (ixtiyoriy)</Label>
                    <Input id="bn" placeholder="Uzcard / Humo" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="ch">Karta egasi</Label>
                  <Input id="ch" placeholder="ALIJON XOLBOBOYEV" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />
                </div>
                <Button type="submit" variant="premium" className="w-full">Saqlash</Button>
              </form>
            )}

            {cards.length === 0 ? (
              <div className="rounded-xl border border-dashed bg-background p-8 text-center text-sm text-muted-foreground">
                <CreditCard className="mx-auto mb-2 h-8 w-8 text-accent" />
                Hali karta qo'shilmagan
              </div>
            ) : (
              <ul className="space-y-3">
                {cards.map((c) => (
                  <li key={c.id} className="rounded-xl border bg-gradient-to-br from-secondary to-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-lg font-bold text-foreground">
                          •••• •••• •••• {c.last4}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {c.card_holder} · {String(c.expiry_month).padStart(2, "0")}/{String(c.expiry_year).slice(-2)}
                          {c.bank_name ? ` · ${c.bank_name}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {c.is_default ? (
                          <span className="rounded-full bg-accent/20 px-2 py-1 text-xs font-semibold text-accent">Asosiy</span>
                        ) : (
                          <button onClick={() => void setDefault(c.id)} className="text-xs text-accent hover:underline">
                            Asosiy qilish
                          </button>
                        )}
                        <button onClick={() => void deleteCard(c.id)} className="text-destructive hover:opacity-80">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Withdrawal */}
          <div className="rounded-2xl border bg-card p-6 shadow-premium">
            <h2 className="mb-4 text-xl font-black text-foreground">Kartaga pul o'tkazish</h2>
            <form onSubmit={requestWithdrawal} className="space-y-3">
              <div>
                <Label htmlFor="amt">Summa (so'm)</Label>
                <Input
                  id="amt"
                  inputMode="numeric"
                  placeholder="50"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cs">Karta</Label>
                <select
                  id="cs"
                  value={selectedCardId}
                  onChange={(e) => setSelectedCardId(e.target.value)}
                  className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
                >
                  <option value="">— tanlang —</option>
                  {cards.map((c) => (
                    <option key={c.id} value={c.id}>
                      •••• {c.last4} · {c.card_holder}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" variant="premium" className="w-full" disabled={loading || cards.length === 0}>
                <ArrowDownToLine className="h-4 w-4" /> O'tkazish
              </Button>
            </form>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase text-accent">So'nggi o'tkazmalar</h3>
              {withdrawals.length === 0 ? (
                <p className="text-sm text-muted-foreground">Hozircha o'tkazmalar yo'q.</p>
              ) : (
                <ul className="space-y-2">
                  {withdrawals.map((w) => {
                    const card = cards.find((c) => c.id === w.card_id);
                    const Icon =
                      w.status === "approved" ? CheckCircle2 : w.status === "rejected" ? XCircle : Clock;
                    const color =
                      w.status === "approved"
                        ? "text-legal-emerald"
                        : w.status === "rejected"
                          ? "text-destructive"
                          : "text-accent";
                    return (
                      <li key={w.id} className="flex items-center justify-between rounded-lg border bg-background p-3 text-sm">
                        <div>
                          <p className="font-semibold text-foreground">{formatSom(Number(w.amount))}</p>
                          <p className="text-xs text-muted-foreground">
                            {card ? `•••• ${card.last4}` : "karta"} ·{" "}
                            {new Date(w.created_at).toLocaleString("uz-UZ")}
                          </p>
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-semibold ${color}`}>
                          <Icon className="h-4 w-4" /> {w.status}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </CaseMindShell>
  );
}
