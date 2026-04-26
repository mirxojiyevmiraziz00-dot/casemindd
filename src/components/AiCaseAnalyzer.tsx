import { useMemo, useState } from "react";
import { FileAudio, FileDown, FileUp, Loader2, Mic, Send, ShieldAlert, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { legalAreas } from "@/lib/casemind-data";

const analysisTemplate = `Quyidagi formatda tahlil qiling:
- Qaysi huquq sohasi
- O‘zbekiston qonunchiligidagi holati
- Chet el davlatlarida bu holat qanday baholanadi
- AQSHda qanday chora ko‘riladi
- Yevropada qanday hal qilinadi
- Turkiyada qanday tartib mavjud
- Sud amaliyoti misollari
- O‘xshash real case’lar
- Xavf darajasi
- Tavsiya etiladigan keyingi qadamlar
- Kerakli hujjatlar va dalillar`;

export function AiCaseAnalyzer() {
  const [situation, setSituation] = useState("");
  const [fileName, setFileName] = useState("");
  const [voiceNote, setVoiceNote] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const detectedArea = useMemo(() => {
    const text = situation.toLowerCase();
    return legalAreas.find((area) => text.includes(area.slug) || text.includes(area.title.toLowerCase().split(" ")[0]))?.title ?? "AI aniqlaydi";
  }, [situation]);

  const analyze = async () => {
    if (!situation.trim() && !fileName && !voiceNote) {
      setError("Vaziyatni yozing, fayl yuklang yoki ovozli izoh yuboring.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const prompt = `${analysisTemplate}\n\nVaziyat: ${situation || "Foydalanuvchi fayl/ovoz yubordi."}\nFayl: ${fileName || "yo‘q"}\nOvoz: ${voiceNote ? "bor" : "yo‘q"}`;
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "AI tahlil amalga oshmadi.");
      setResult(data.content);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Noma’lum xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = () => {
    const content = `CaseMind AI Report\n\nVaziyat:\n${situation}\n\nNatija:\n${result || "Tahlil hali yaratilmagan."}`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "casemind-ai-report.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="premium-card rounded-2xl border p-6 shadow-premium">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase text-accent">AI Vaziyat Tahlilchi</p>
              <h2 className="text-3xl font-black text-foreground">Muammoingizni yozing</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="situation">Huquqiy vaziyat</Label>
              <Textarea
                id="situation"
                value={situation}
                onChange={(event) => setSituation(event.target.value)}
                placeholder="Masalan: shartnoma buzildi, ish haqi berilmadi, tergovga chaqirishdi..."
                className="min-h-44 bg-background"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Label className="rounded-xl border bg-background p-4">
                <span className="mb-3 flex items-center gap-2 font-semibold"><FileUp className="h-4 w-4 text-accent" /> Fayl yuklash</span>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                  className="bg-card"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
                />
                {fileName && <span className="mt-2 block text-xs text-muted-foreground">{fileName}</span>}
              </Label>
              <button
                type="button"
                onClick={() => setVoiceNote((value) => !value)}
                className="rounded-xl border bg-background p-4 text-left transition hover:bg-secondary"
              >
                <span className="mb-3 flex items-center gap-2 font-semibold"><Mic className="h-4 w-4 text-accent" /> Ovoz yuborish</span>
                <span className="text-sm text-muted-foreground">{voiceNote ? "Ovozli izoh biriktirildi" : "Demo ovoz yozishni yoqish"}</span>
              </button>
            </div>
            <div className="rounded-xl border bg-secondary p-4 text-sm text-muted-foreground">
              Taxminiy soha: <span className="font-semibold text-foreground">{detectedArea}</span>
            </div>
            {error && <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">{error}</p>}
            <Button variant="premium" size="lg" className="w-full" onClick={() => void analyze()} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Tahlil qilish
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-premium">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase text-accent">Natija</p>
              <h3 className="text-3xl font-black text-foreground">Global huquqiy yo‘nalish</h3>
            </div>
            <ShieldAlert className="h-9 w-9 text-accent" />
          </div>
          <div className="min-h-96 rounded-xl border bg-background p-5 leading-7">
            {isLoading ? (
              <div className="flex h-80 items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Tahlil qilinmoqda...</div>
            ) : result ? (
              <div className="prose prose-invert max-w-none prose-p:my-2 prose-li:my-1 prose-strong:text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex h-80 flex-col items-center justify-center text-center text-muted-foreground">
                <FileAudio className="mb-4 h-10 w-10 text-accent" />
                Vaziyatni yuboring — tahlil shu yerda paydo bo‘ladi.
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button variant="legal" onClick={downloadReport} disabled={!result}>
              <FileDown className="h-4 w-4" /> PDF report download
            </Button>
            <Button variant="legal" asChild>
              <a href="/case-database">O‘xshash case topish</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
