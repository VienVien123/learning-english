"use client";

/**
 * Pronunciation practice with the browser's speech recognition (Chrome, Edge, Safari).
 * Microphone access needs a secure origin: https:// or localhost.
 */

type RecognitionResultList = ArrayLike<ArrayLike<{ transcript: string; confidence: number }>>;
type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: { results: RecognitionResultList }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type PronounceSupport = "ok" | "unsupported" | "insecure";

export function pronounceSupport(): PronounceSupport {
  if (!recognitionCtor()) return "unsupported";
  if (typeof window !== "undefined" && !window.isSecureContext) return "insecure";
  return "ok";
}

let active: Recognition | null = null;

/** Listen once and resolve with what the browser heard (best guess first). */
export function listenOnce(timeoutMs = 6000): Promise<string[]> {
  const Ctor = recognitionCtor();
  if (!Ctor) return Promise.reject(new Error("unsupported"));
  active?.abort();
  return new Promise((resolve, reject) => {
    const rec = new Ctor();
    active = rec;
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 5;
    let heard: string[] = [];
    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (active === rec) active = null;
      fn();
    };
    const timer = window.setTimeout(() => rec.stop(), timeoutMs);
    rec.onresult = (e) => {
      const first = e.results[0];
      heard = Array.from({ length: first?.length ?? 0 }, (_, i) => first[i].transcript.trim()).filter(Boolean);
    };
    rec.onerror = (e) => finish(() => (e.error === "no-speech" ? resolve([]) : reject(new Error(e.error))));
    rec.onend = () => finish(() => resolve(heard));
    try {
      rec.start();
    } catch (err) {
      finish(() => reject(err instanceof Error ? err : new Error("start-failed")));
    }
  });
}

function clean(text: string) {
  return text.toLowerCase().replace(/[^a-z' ]/g, "").replace(/\s+/g, " ").trim();
}

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

/** Score 0–100: how close the closest heard alternative is to the target word. */
export function scorePronunciation(heard: string[], target: string) {
  const goal = clean(target);
  let best = { text: heard[0] ?? "", score: 0 };
  for (const alt of heard) {
    const said = clean(alt);
    // Recognisers sometimes add words ("the car"); credit an exact word inside the phrase.
    const contains = said.split(" ").includes(goal) || said === goal;
    const score = contains ? 100 : Math.round((1 - distance(said, goal) / Math.max(said.length, goal.length, 1)) * 100);
    if (score > best.score) best = { text: alt, score };
  }
  return { ...best, passed: best.score >= 80 };
}

export function pronounceErrorMessage(err: unknown) {
  const code = err instanceof Error ? err.message : "";
  if (code === "not-allowed" || code === "service-not-allowed") return "Trình duyệt chưa cho dùng micro. Hãy cho phép micro rồi thử lại.";
  if (code === "audio-capture") return "Không tìm thấy micro.";
  if (code === "network") return "Nhận dạng giọng nói cần kết nối mạng.";
  if (code === "unsupported") return "Trình duyệt này chưa hỗ trợ luyện phát âm (hãy dùng Chrome hoặc Edge).";
  return "Không nhận được giọng nói, thử lại nhé.";
}
