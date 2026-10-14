"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReviewRating, Vocabulary } from "@/lib/types";
import { speakEnglish } from "@/lib/speech";
import { PeekCrew, SootBuddy, type CrewMember, type SignTone, type SootMood } from "./Soot";

const STUDY_CREW: CrewMember[] = [
  { x: 12, size: 70, look: { bloom: "green" }, tool: "magnifier" },
  { x: 30, size: 90, look: { hat: true }, tool: "binoculars", bubble: true },
  { x: 70, size: 96, look: { bloom: "pink", holdR: "star-yellow" }, tool: "spyglass", bubble: true },
  { x: 88, size: 70, look: { bloom: "yellow" }, tool: "binoculars" },
];

type Reaction = { mood: SootMood; signs?: (string | undefined)[]; tone?: SignTone };

// How the crew reacts to each rating: Again, Hard, Good, Easy.
const REACTIONS: Reaction[] = [
  { mood: "error", signs: ["Oops!", undefined, "Ôn lại nhé!", undefined] },
  { mood: "idle", signs: [undefined, "Cố lên!", undefined, undefined], tone: "good" },
  { mood: "happy", signs: [undefined, undefined, "Giỏi lắm!", undefined], tone: "good" },
  { mood: "happy", signs: ["Wow!", undefined, "Dễ ợt!", "★"], tone: "good" },
];

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
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [cheer, setCheer] = useState(0);
  const reactionTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(reactionTimer.current), []);

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [words.length]);

  const current = useMemo(() => words[index], [words, index]);

  if (!current) {
    return (
      <div className="empty-study">
        <div className="soot-crew-row">
          <SootBuddy size={52} mood="happy" look={{ bloom: "green", holdL: "star-pink" }} />
          <SootBuddy size={72} mood="happy" look={{ hat: true, holdR: "star-yellow" }} />
          <SootBuddy size={52} mood="happy" look={{ bloom: "pink", holdR: "flower-yellow" }} />
        </div>
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
    setReaction(REACTIONS[rating]);
    if (rating >= 2) setCheer((v) => v + 1);
    window.clearTimeout(reactionTimer.current);
    reactionTimer.current = window.setTimeout(() => setReaction(null), 1500);
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

      <PeekCrew
        className="study-peek"
        members={STUDY_CREW}
        mood={reaction?.mood ?? (revealed ? "watching" : "curious")}
        signs={reaction?.signs}
        signTone={reaction?.tone}
        bubble={reaction?.mood === "happy" ? "♪" : "?"}
        cheer={cheer}
        ledge={84}
      >
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
      </PeekCrew>

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
