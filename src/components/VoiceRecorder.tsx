import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, Pause, Play, RotateCcw, Square, Trash2, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type RecorderState = "idle" | "requesting" | "recording" | "recorded" | "denied" | "unsupported";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function pickMimeType(): { mimeType?: string; format: "webm" | "m4a" } {
  if (typeof MediaRecorder === "undefined") return { format: "webm" };
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) return { mimeType: "audio/webm;codecs=opus", format: "webm" };
  if (MediaRecorder.isTypeSupported("audio/webm")) return { mimeType: "audio/webm", format: "webm" };
  if (MediaRecorder.isTypeSupported("audio/mp4")) return { mimeType: "audio/mp4", format: "m4a" };
  return { format: "webm" };
}

export function VoiceRecorder({
  onTranscript,
  onAudioChange,
}: {
  onTranscript: (text: string) => void;
  onAudioChange?: (clip: { blob: Blob; format: "webm" | "m4a" } | null) => void;
}) {
  const [state, setState] = useState<RecorderState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState("");

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const formatRef = useRef<"webm" | "m4a">("webm");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (!navigator.mediaDevices || typeof MediaRecorder === "undefined")) {
      setState("unsupported");
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    setSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSeconds((value) => value + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startRecording = async () => {
    setError("");
    if (typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState("unsupported");
      return;
    }
    setState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const { mimeType, format } = pickMimeType();
      formatRef.current = format;
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType ?? "audio/webm" });
        blobRef.current = blob;
        onAudioChange?.({ blob, format: formatRef.current });
        setAudioUrl((previous) => {
          if (previous) URL.revokeObjectURL(previous);
          return URL.createObjectURL(blob);
        });
        setState("recorded");
      };
      recorderRef.current = recorder;
      recorder.start();
      startTimer();
      setState("recording");
    } catch (caught) {
      stopTimer();
      const name = caught instanceof DOMException ? caught.name : "";
      if (name === "NotAllowedError" || name === "SecurityError") {
        setState("denied");
        setError("Mikrofonga ruxsat berilmadi. Brauzer sozlamalaridan ruxsat bering va qayta urinib ko‘ring.");
      } else if (name === "NotFoundError") {
        setState("idle");
        setError("Mikrofon topilmadi. Qurilmangizni tekshiring.");
      } else {
        setState("idle");
        setError("Ovoz yozishni boshlab bo‘lmadi.");
      }
    }
  };

  const stopRecording = () => {
    stopTimer();
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  };

  const togglePlay = () => {
    const element = audioRef.current;
    if (!element) return;
    if (element.paused) {
      void element.play();
      setIsPlaying(true);
    } else {
      element.pause();
      setIsPlaying(false);
    }
  };

  const reset = () => {
    stopTimer();
    setSeconds(0);
    setIsPlaying(false);
    blobRef.current = null;
    onAudioChange?.(null);
    setAudioUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return "";
    });
    setState("idle");
    setError("");
  };

  const transcribe = async () => {
    const blob = blobRef.current;
    if (!blob) return;
    setIsTranscribing(true);
    setError("");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Audio o‘qilmadi."));
        reader.onload = () => {
          const value = String(reader.result);
          resolve(value.slice(value.indexOf(",") + 1));
        };
        reader.readAsDataURL(blob);
      });

      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcribeOnly: true,
          audioBase64: base64,
          audioFormat: formatRef.current,
          messages: [{ role: "user", content: "Ushbu audio yozuvni matnga aylantiring." }],
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || "Transkripsiya amalga oshmadi.");
      const text = String(data?.content ?? "").trim();
      if (!text) throw new Error("Audio matnga aylanmadi — qaytadan yozib ko‘ring.");
      onTranscript(text);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Transkripsiya xatosi.");
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 font-semibold">
          <Mic className={`h-4 w-4 text-accent ${state === "recording" ? "animate-pulse" : ""}`} /> Ovoz yuborish
        </span>
        {(state === "recording" || state === "recorded") && (
          <span className="rounded-full border bg-card px-2 py-0.5 font-mono text-xs text-foreground">
            {formatTime(seconds)}
          </span>
        )}
      </div>

      {state === "unsupported" ? (
        <p className="text-sm text-muted-foreground">Bu brauzer ovoz yozishni qo‘llab-quvvatlamaydi.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {(state === "idle" || state === "denied") && (
            <Button type="button" variant="legal" size="sm" onClick={() => void startRecording()}>
              <Mic className="h-4 w-4" /> Yozishni boshlash
            </Button>
          )}
          {state === "requesting" && (
            <Button type="button" variant="legal" size="sm" disabled>
              <Loader2 className="h-4 w-4 animate-spin" /> Ruxsat so‘ralmoqda
            </Button>
          )}
          {state === "recording" && (
            <Button type="button" variant="premium" size="sm" onClick={stopRecording}>
              <Square className="h-4 w-4" /> To‘xtatish
            </Button>
          )}
          {state === "recorded" && (
            <>
              <Button type="button" variant="legal" size="sm" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} Tinglash
              </Button>
              <Button type="button" variant="legal" size="sm" onClick={() => void startRecording()}>
                <RotateCcw className="h-4 w-4" /> Qayta yozish
              </Button>
              <Button type="button" variant="legal" size="sm" onClick={reset}>
                <Trash2 className="h-4 w-4" /> O‘chirish
              </Button>
              <Button type="button" variant="premium" size="sm" onClick={() => void transcribe()} disabled={isTranscribing}>
                {isTranscribing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />} Matnga aylantirish
              </Button>
            </>
          )}
        </div>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          controls
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          className="mt-3 w-full"
        />
      )}

      {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      {!error && state === "idle" && !audioUrl && (
        <p className="mt-3 text-xs text-muted-foreground">Mikrofonda gapiring — AI matnga aylantiradi.</p>
      )}
    </div>
  );
}
