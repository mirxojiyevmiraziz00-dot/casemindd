import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, FileUp, Loader2, LockKeyhole, RefreshCw, UploadCloud } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type LegalDocument = Database["public"]["Tables"]["legal_documents"]["Row"];
type DocumentType = Database["public"]["Enums"]["legal_document_type"];

type LegalDocumentManagerProps = {
  defaultType?: DocumentType;
  title: string;
  description: string;
};

const documentTypes: Array<{ value: DocumentType; label: string; language: string }> = [
  { value: "criminal_code_uz", label: "Jinoyat kodeksi — o‘zbekcha", language: "uz" },
  { value: "criminal_code_en", label: "Criminal Code — English", language: "en" },
  { value: "plenum_decision", label: "Oliy sud Plenum qarori", language: "uz" },
  { value: "other", label: "Boshqa huquqiy hujjat", language: "uz" },
];

function cleanFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

function formatSize(size: number | null) {
  if (!size) return "Noma’lum hajm";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function LegalDocumentManager({ defaultType = "criminal_code_uz", title, description }: LegalDocumentManagerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [documentType, setDocumentType] = useState<DocumentType>(defaultType);
  const [documentTitle, setDocumentTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const visibleDocuments = useMemo(() => {
    if (defaultType === "other") return documents;
    return documents.filter((document) => document.document_type === defaultType);
  }, [defaultType, documents]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    void supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    void loadDocuments();

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    const { data, error: loadError } = await supabase
      .from("legal_documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError("Hujjatlar ro‘yxatini olishda xatolik yuz berdi.");
    } else {
      setDocuments(data ?? []);
      setError("");
    }
    setIsLoading(false);
  };

  const uploadDocument = async () => {
    setError("");
    setMessage("");

    if (!user) {
      setError("Avval login qiling, keyin hujjat yuklay olasiz.");
      return;
    }

    if (!file) {
      setError("Yuklash uchun fayl tanlang.");
      return;
    }

    const pickedType = documentTypes.find((item) => item.value === documentType) ?? documentTypes[0];
    const titleToSave = documentTitle.trim() || pickedType.label;
    const storagePath = `${user.id}/${Date.now()}-${cleanFileName(file.name)}`;

    setIsUploading(true);
    try {
      const { error: storageError } = await supabase.storage
        .from("legal-documents")
        .upload(storagePath, file, { contentType: file.type || "application/octet-stream", upsert: false });

      if (storageError) throw storageError;

      const { error: dbError } = await supabase.from("legal_documents").insert({
        user_id: user.id,
        title: titleToSave,
        document_type: documentType,
        language: pickedType.language,
        storage_path: storagePath,
        file_name: file.name,
        mime_type: file.type,
        file_size: file.size,
        status: "uploaded",
      });

      if (dbError) throw dbError;

      setMessage("Hujjat yuklandi. Endi uni bo‘limlarga ajratish va AI izohlariga tayyorlash mumkin.");
      setDocumentTitle("");
      setFile(null);
      await loadDocuments();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Yuklashda xatolik yuz berdi.");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadDocument = async (document: LegalDocument) => {
    if (document.source_url) {
      window.open(document.source_url, "_blank", "noopener,noreferrer");
      return;
    }
    if (!document.storage_path) {
      setError("Bu hujjat uchun fayl yoki havola mavjud emas.");
      return;
    }
    const { data, error: signedError } = await supabase.storage
      .from("legal-documents")
      .createSignedUrl(document.storage_path, 60 * 5, { download: document.file_name ?? undefined });

    if (signedError || !data?.signedUrl) {
      setError("Faylni ochish uchun havola yaratib bo‘lmadi.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-legal-emerald">Hujjatlar bazasi</p>
          <h2 className="mt-2 text-4xl font-bold text-premium">{title}</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{description}</p>
        </div>
        <Button variant="legal" onClick={() => void loadDocuments()} disabled={isLoading}>
          <RefreshCw className={isLoading ? "h-4 w-4 animate-spin" : "h-4 w-4"} /> Yangilash
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border bg-card p-6 shadow-premium">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-premium text-premium-foreground">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-premium">Fayl yuklash</h3>
              <p className="text-sm text-muted-foreground">PDF, DOCX, TXT yoki boshqa hujjat formati</p>
            </div>
          </div>

          {!user ? (
            <div className="rounded-xl border bg-background p-5">
              <LockKeyhole className="mb-3 h-7 w-7 text-legal-gold" />
              <p className="leading-7 text-card-foreground">Hujjat yuklash uchun avval login qiling.</p>
              <Button className="mt-4" variant="premium" asChild>
                <Link to="/login">Login sahifasiga o‘tish</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document-title">Hujjat nomi</Label>
                <Input
                  id="document-title"
                  value={documentTitle}
                  onChange={(event) => setDocumentTitle(event.target.value)}
                  placeholder="Masalan: Jinoyat kodeksi 2024 o‘zbekcha"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label>Hujjat turi</Label>
                <Select value={documentType} onValueChange={(value) => setDocumentType(value as DocumentType)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="document-file">Fayl</Label>
                <Input
                  id="document-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf,.csv,.json,.png,.jpg,.jpeg,.webp"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  className="h-auto bg-background py-3"
                />
              </div>
              <Button variant="premium" className="w-full" onClick={() => void uploadDocument()} disabled={isUploading}>
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
                Yuklash
              </Button>
            </div>
          )}

          {message && <p className="mt-4 rounded-xl border border-legal-emerald/30 bg-legal-emerald/10 p-4 text-sm text-card-foreground">{message}</p>}
          {error && <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-card-foreground">{error}</p>}
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-premium">
          <h3 className="text-2xl font-bold text-premium">Yuklangan hujjatlar</h3>
          <div className="mt-5 space-y-3">
            {isLoading ? (
              <div className="rounded-xl bg-muted p-5 text-muted-foreground">Yuklanmoqda...</div>
            ) : visibleDocuments.length === 0 ? (
              <div className="rounded-xl bg-muted p-5 text-muted-foreground">Hali hujjat yuklanmagan.</div>
            ) : (
              visibleDocuments.map((document) => (
                <article key={document.id} className="rounded-xl border bg-background p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-legal-emerald">{documentTypes.find((item) => item.value === document.document_type)?.label}</p>
                      <h4 className="mt-1 text-lg font-bold text-card-foreground">{document.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{document.file_name} · {formatSize(document.file_size)} · {document.status}</p>
                    </div>
                    <Button variant="legal" onClick={() => void downloadDocument(document)}>
                      <Download className="h-4 w-4" /> Ochish
                    </Button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
