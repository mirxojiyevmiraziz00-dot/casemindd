import { useState } from "react";
import { Bot, Clapperboard, Image, Loader2, Send, Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Assalomu alaykum! CaseMind AI yordamchisi: vaziyatingizni yozing — O‘zbekiston va xalqaro huquqiy tajriba asosida tahlil qilaman.",
  },
];

export function AiLegalAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisualLoading, setIsVisualLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "AI javob qaytara olmadi.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.content }]);
      void generateVisual(`${question}\n${data.content}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Noma’lum xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateVisual = async (prompt: string) => {
    setIsVisualLoading(true);
    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visual: true, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Visual AI ishlamadi.");
      if (data?.imageUrl) {
        setMessages((current) => {
          const next = [...current];
          for (let index = next.length - 1; index >= 0; index -= 1) {
            if (next[index].role === "assistant") {
              next[index] = { ...next[index], imageUrl: data.imageUrl };
              break;
            }
          }
          return next;
        });
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Visual yaratishda xatolik yuz berdi.");
    } finally {
      setIsVisualLoading(false);
    }
  };

  const lastAssistantMessage = [...messages].reverse().find((message) => message.role === "assistant")?.content ?? "";
  const visualLabel = lastAssistantMessage.toLowerCase().includes("contract") || lastAssistantMessage.toLowerCase().includes("shartnoma")
    ? "Shartnoma va muzokara sahnasi"
    : lastAssistantMessage.toLowerCase().includes("crime") || lastAssistantMessage.toLowerCase().includes("jinoyat")
      ? "Sud-tergov motion sahnasi"
      : "Global legal intelligence sahnasi";

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-legal-emerald">Sun’iy intellekt</p>
        <h2 className="mt-2 text-4xl font-bold text-premium">AI huquqiy yordamchi</h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          Huquqiy vaziyat, davlat, soha yoki precedent bo‘yicha savol bering — yordamchi global tahlil va keyingi qadamlarni beradi.
        </p>
      </div>

      <div className="premium-card overflow-hidden rounded-2xl border shadow-premium">
        <div className="flex items-center justify-between border-b bg-card/80 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-premium text-premium-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-premium">CaseMind AI</h3>
              <p className="text-xs text-muted-foreground">Oson sharh, misol va ogohlantirish bilan</p>
            </div>
          </div>
          {isLoading || isVisualLoading ? <Loader2 className="h-5 w-5 animate-spin text-legal-gold" /> : <Bot className="h-5 w-5 text-legal-emerald" />}
        </div>

        <div className="max-h-[520px] space-y-4 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={cn("flex gap-3", message.role === "user" && "justify-end")}>
              {message.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-premium text-premium-foreground">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[88%] rounded-2xl border px-4 py-3 leading-7 shadow-premium",
                  message.role === "assistant" ? "bg-card text-card-foreground" : "bg-accent text-accent-foreground",
                )}
              >
                <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-strong:text-inherit">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
                {message.imageUrl && <img src={message.imageUrl} alt="AI yaratgan huquqiy vaziyat visuali" className="mt-3 aspect-video w-full rounded-xl border object-cover" loading="lazy" />}
              </div>
              {message.role === "user" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {error && <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive-foreground">{error}</div>}
        </div>

        <div className="border-t bg-card/80 p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              placeholder="Masalan: shartnoma buzildi, AQSH va O‘zbekistonda qanday choralar bor?"
              className="min-h-12 flex-1 resize-none rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition focus:border-legal-gold focus:ring-2 focus:ring-legal-gold/20"
            />
            <Button variant="premium" size="lg" onClick={() => void sendMessage()} disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Yuborish
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border bg-card p-5 shadow-premium md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-premium text-premium-foreground"><Image className="h-5 w-5" /></div><div><p className="text-sm font-semibold uppercase text-accent">AI visual companion</p><h3 className="text-2xl font-black text-foreground">{visualLabel}</h3></div></div>
        <div className="relative min-h-36 overflow-hidden rounded-xl border bg-secondary p-5">
          <div className="absolute inset-0 legal-grid opacity-35" />
          <Clapperboard className="absolute right-5 top-5 h-10 w-10 animate-float text-accent" />
          <p className="relative max-w-2xl leading-7 text-muted-foreground">{isVisualLoading ? "AI javobga mos premium rasmni yaratmoqda..." : "AI javobiga mos rasm chat ichida avtomatik paydo bo‘ladi: sud zali, advokatlar ofisi, dunyo xaritasi va dalillar paneli."}</p>
        </div>
      </div>
    </section>
  );
}
