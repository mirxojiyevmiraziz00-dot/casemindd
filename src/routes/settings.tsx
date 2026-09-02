import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Film, Instagram, Languages, Loader2, Moon, Send, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { CaseMindShell } from "@/components/CaseMindShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Sozlamalar va social studio — CaseMind" },
      {
        name: "description",
        content: "CaseMind interfeys tili, Instagram va Telegram ulash hamda media kontent yuklash markazi.",
      },
      { property: "og:title", content: "Sozlamalar va social studio — CaseMind" },
      {
        property: "og:description",
        content: "Til tanlash, ijtimoiy kanallarni ulash va huquqiy media kontent yuklash.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const languages = ["O‘zbek", "Русский", "English", "Deutsch", "اردو", "Türkçe"];

function SettingsPage() {
  const [language, setLanguage] = useState("O‘zbek");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("casemind-language");
    if (saved) setLanguage(saved);
  }, []);

  const chooseLanguage = (value: string) => {
    setLanguage(value);
    window.localStorage.setItem("casemind-language", value);
    toast.success(`Interfeys tili: ${value}`);
  };

  const saveMedia = async () => {
    if (!title.trim()) {
      toast.error("Post sarlavhasini kiriting");
      return;
    }
    setIsSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) {
        toast.error("Kontent saqlash uchun tizimga kiring");
        return;
      }

      let storagePath: string | null = null;
      if (file) {
        const path = `${userId}/media/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error: uploadError } = await supabase.storage
          .from("legal-documents")
          .upload(path, file, { upsert: false, contentType: file.type });
        if (uploadError) throw uploadError;
        storagePath = path;
      }

      const { error } = await supabase.from("legal_documents").insert({
        user_id: userId,
        title: title.trim(),
        document_type: "other",
        description: caption.trim() || null,
        storage_path: storagePath,
        file_name: file?.name ?? null,
        mime_type: file?.type ?? null,
        file_size: file?.size ?? null,
        status: "uploaded",
      });
      if (error) throw error;

      toast.success("Kontent saqlandi");
      setTitle("");
      setCaption("");
      setFile(null);
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Saqlashda xatolik");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CaseMindShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Moon className="mb-5 h-10 w-10 text-accent" />
        <h1 className="text-5xl font-black text-foreground">Sozlamalar va social studio</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {languages.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => chooseLanguage(item)}
              className={`rounded-2xl border p-6 text-left shadow-premium transition hover:-translate-y-1 ${
                language === item ? "border-accent bg-accent/10" : "bg-card"
              }`}
            >
              <Languages className="mb-4 h-6 w-6 text-accent" />
              {item}
              {language === item && <span className="ml-2 text-xs font-bold text-accent">tanlangan</span>}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="premium-card rounded-2xl border p-6 shadow-premium">
            <p className="text-sm font-semibold uppercase text-accent">Connector ready</p>
            <h2 className="mt-2 text-3xl font-black text-foreground">Instagram va Telegram ulash</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Bu yer social kanallarni ulash va media reja tayyorlash markazi. Kanallarga o‘tib kontentni joylang.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button variant="premium" asChild>
                <a href="https://instagram.com/_miraziz.1" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" /> Instagram ochish
                </a>
              </Button>
              <Button variant="legal" asChild>
                <a href="https://t.me/mirxojiyev" target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" /> Telegram ochish
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-premium">
            <div className="flex items-center gap-3">
              <Film className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm font-semibold uppercase text-accent">Media upload</p>
                <h2 className="text-3xl font-black text-foreground">Video yoki post tayyorlash</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              <Input
                placeholder="Post sarlavhasi"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="bg-background"
              />
              <Textarea
                placeholder="Caption / matn / huquqiy izoh"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                className="min-h-28 bg-background"
              />
              <Input
                type="file"
                accept="video/*,image/*"
                className="h-auto bg-background py-3"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
              <Button variant="premium" type="button" onClick={() => void saveMedia()} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}{" "}
                Kontentni saqlash
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CaseMindShell>
  );
}
