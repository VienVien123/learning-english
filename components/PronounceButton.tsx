"use client";

import { useState } from "react";
import { Loader2, Mic } from "lucide-react";
import { listenOnce, pronounceErrorMessage, pronounceSupport, scorePronunciation } from "@/lib/pronounce";
import { playSound } from "@/lib/sound";

type State =
  | { kind: "idle" }
  | { kind: "listening" }
  | { kind: "result"; heard: string; score: number; passed: boolean }
  | { kind: "error"; message: string };

// Small "say it" button: listens through the mic and scores how close the learner got.
export default function PronounceButton({ word, compact = false }: { word: string; compact?: boolean }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const support = pronounceSupport();

  if (support !== "ok") {
    return (
      <span className="pronounce pronounce-off" title={support === "insecure" ? "Luyện phát âm cần mở web bằng https:// hoặc localhost" : "Trình duyệt chưa hỗ trợ luyện phát âm"}>
        <Mic size={15} /> {compact ? "" : "Phát âm (cần Chrome/Edge qua https)"}
      </span>
    );
  }

  async function practise(e: React.MouseEvent) {
    e.stopPropagation();
    if (state.kind === "listening") return;
    setState({ kind: "listening" });
    try {
      const heard = await listenOnce();
      if (!heard.length) {
        setState({ kind: "error", message: "Chưa nghe thấy gì, thử nói to hơn nhé." });
        return;
      }
      const result = scorePronunciation(heard, word);
      playSound(result.passed ? "correct" : "wrong");
      setState({ kind: "result", heard: result.text, score: result.score, passed: result.passed });
    } catch (err) {
      setState({ kind: "error", message: pronounceErrorMessage(err) });
    }
  }

  return (
    <span className="pronounce" onPointerDown={(e) => e.stopPropagation()}>
      <button type="button" className={`pronounce-btn${state.kind === "listening" ? " listening" : ""}`} onClick={practise} aria-label={`Luyện phát âm ${word}`}>
        {state.kind === "listening" ? <Loader2 className="spin" size={15} /> : <Mic size={15} />}
        {state.kind === "listening" ? "Đang nghe…" : "Luyện phát âm"}
      </button>
      {state.kind === "result" && (
        <span className={`pronounce-result ${state.passed ? "good" : "bad"}`}>
          {state.passed ? "Chuẩn rồi!" : "Gần đúng"} · “{state.heard}” · {state.score}%
        </span>
      )}
      {state.kind === "error" && <span className="pronounce-result bad">{state.message}</span>}
    </span>
  );
}
