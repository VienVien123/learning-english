"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Volume2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { ReviewRating, Vocabulary } from "@/lib/types";
import { speakEnglish } from "@/lib/speech";

export default function FlashcardStudy({
  words,
  onReview,
}: {
  words: Vocabulary[];
  onReview: (word: Vocabulary, rating: ReviewRating) => Promise<void>;
}) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [words.length]);

  const current = useMemo(() => words[index], [words, index]);

  if (!current) {
    return (
      <div className="empty-study">
        <div className="success-orb"><Sparkles size={34} /></div>
        <h2>You&apos;re all caught up ✨</h2>
        <p>No cards are due right now. Add more words or come back when the next review is ready.</p>
      </div>
    );
  }

  function toggleReveal() {
    setRevealed((wasRevealed) => {
      const next = !wasRevealed;
      if (next) speakEnglish(current.word);
      return next;
    });
  }

  async function rate(rating: ReviewRating) {
    setBusy(true);
    try {
      await onReview(current, rating);
      setRevealed(false);
      setIndex((prev) => Math.min(prev, Math.max(0, words.length - 2)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="study-shell">
      <div className="study-topbar">
        <div>
          <span className="muted">Session progress</span>
          <strong>{index + 1} / {words.length}</strong>
        </div>
        <div className="study-progress"><span style={{ width: `${((index + 1) / words.length) * 100}%` }} /></div>
        <button className="button secondary compact" onClick={() => { setIndex(0); setRevealed(false); }}><RotateCcw size={16} /> Restart</button>
      </div>

      <div className={`flashcard ${revealed ? "revealed" : ""}`} onClick={toggleReveal}>
        <div className="card-glow" />
        <div className="flashcard-face">
          <div className="flashcard-badges">
            {current.part_of_speech && <span>{current.part_of_speech}</span>}
            {current.tags?.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <button className="speak-btn" onClick={(e) => { e.stopPropagation(); speakEnglish(current.word); }} aria-label="Pronounce word"><Volume2 size={20} /></button>
          <div className="flashcard-center">
            <h1>{current.word}</h1>
            {current.pronunciation && <div className="pronunciation">{current.pronunciation}</div>}
            {!revealed && <p className="tap-hint">Tap the card to reveal the meaning</p>}
            {revealed && (
              <div className="answer-block">
                <div className="meaning">{current.meaning}</div>
                {current.example && <blockquote>{current.example}</blockquote>}
                {current.example_translation && <p>{current.example_translation}</p>}
                {current.note && <div className="note-box">💡 {current.note}</div>}
              </div>
            )}
          </div>
          <div className="card-footer">{revealed ? "Tap again to hide" : "Think first, then reveal"}</div>
        </div>
      </div>

      {revealed ? (
        <div className="rating-row">
          <button disabled={busy} className="rating again" onClick={() => rate(0)}><span>Again</span><small>10 min</small></button>
          <button disabled={busy} className="rating hard" onClick={() => rate(1)}><span>Hard</span><small>1 day</small></button>
          <button disabled={busy} className="rating good" onClick={() => rate(2)}><span>Good</span><small>adaptive</small></button>
          <button disabled={busy} className="rating easy" onClick={() => rate(3)}><span>Easy</span><small>longer</small></button>
        </div>
      ) : (
        <div className="study-nav">
          <button className="icon-btn" onClick={() => { setIndex((i) => Math.max(0, i - 1)); setRevealed(false); }} disabled={index === 0}><ChevronLeft size={20} /></button>
          <span>Use the arrow buttons to browse without grading.</span>
          <button className="icon-btn" onClick={() => { setIndex((i) => Math.min(words.length - 1, i + 1)); setRevealed(false); }} disabled={index === words.length - 1}><ChevronRight size={20} /></button>
        </div>
      )}
    </div>
  );
}
