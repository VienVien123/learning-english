"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, BookOpen, Check, Lightbulb, Loader2, Mic, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import type { ReviewRating, Vocabulary } from "@/lib/types";
import { speakEnglish } from "@/lib/speech";
import { isDue } from "@/lib/srs";
import { addReviewId, removeReviewId, useReviewIds } from "@/lib/reviewList";
import { playSound, useSoundOn } from "@/lib/sound";
import { listenOnce, pronounceErrorMessage, pronounceSupport, scorePronunciation } from "@/lib/pronounce";
import { PeekCrew, SootBuddy, SootSprite, type CrewMember, type Look } from "./Soot";
import PronounceButton from "./PronounceButton";

// Each word: intro card → one practice exercise (rotating type) → listen & write → (every other word) say it.
type Kind = "intro" | "choose" | "listen" | "cloze" | "scramble" | "write" | "speak";
type Step = { kind: Kind; id: string; options?: string[]; letters?: string[] };
type Result = { correct: boolean; answer: string; score?: number };

const LESSON_SIZE = 6;
const MAX_RETRIES = 2;
const SLOW_RATE = 0.5;
const CHOICE_KINDS: Kind[] = ["choose", "listen", "cloze"];

const PROMPTS: Record<Kind, string> = {
  intro: "Từ mới",
  choose: "Chọn nghĩa đúng",
  listen: "Nghe và chọn từ đúng",
  cloze: "Chọn từ điền vào chỗ trống",
  scramble: "Sắp xếp các chữ cái",
  write: "Nghe và viết lại",
  speak: "Đọc to từ này",
};

const SHEET_CREW: CrewMember[] = [
  { x: 7, size: 84, look: { bloom: "pink", holdR: "star-yellow" } },
  { x: 16, size: 60, look: { hat: true } },
];

// New words first, then words that are due, then the least mastered.
function pickLessonWords(words: Vocabulary[]) {
  const score = (w: Vocabulary) => (w.review_count === 0 ? 0 : isDue(w) ? 1 : 2) * 10 + w.mastery_level;
  return [...words].sort((a, b) => score(a) - score(b)).slice(0, LESSON_SIZE);
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[’']/g, "'").replace(/[.,!?;:"]/g, "").replace(/\s+/g, " ").trim();
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function containsWord(example: string | null, word: string) {
  return !!example && example.toLowerCase().includes(word.trim().toLowerCase());
}

function scrambleLetters(word: string) {
  const letters = word.toLowerCase().split("");
  let mixed = shuffle(letters);
  for (let tries = 0; tries < 6 && mixed.join("") === letters.join(""); tries++) mixed = shuffle(letters);
  return mixed;
}

// Build a practice step for the k-th word, rotating through the types it qualifies for.
function practiceStep(w: Vocabulary, k: number, pool: Vocabulary[]): Step | null {
  const byMeaning = pool.filter((x) => x.id !== w.id && normalize(x.meaning) !== normalize(w.meaning));
  const byWord = pool.filter((x) => x.id !== w.id && normalize(x.word) !== normalize(w.word));
  const order: Kind[] = ["choose", "listen", "cloze", "scramble"];
  for (let i = 0; i < order.length; i++) {
    const kind = order[(k + i) % order.length];
    if (kind === "choose" && byMeaning.length >= 2) return { kind, id: w.id, options: shuffle([w.id, ...shuffle(byMeaning).slice(0, 3).map((x) => x.id)]) };
    if (kind === "listen" && byWord.length >= 2) return { kind, id: w.id, options: shuffle([w.id, ...shuffle(byWord).slice(0, 3).map((x) => x.id)]) };
    if (kind === "cloze" && byWord.length >= 2 && containsWord(w.example, w.word)) return { kind, id: w.id, options: shuffle([w.id, ...shuffle(byWord).slice(0, 3).map((x) => x.id)]) };
    if (kind === "scramble" && /^[a-z]{3,12}$/i.test(w.word.trim())) return { kind, id: w.id, letters: scrambleLetters(w.word.trim()) };
  }
  return null;
}

function hintMask(word: string, shown: number) {
  let count = 0;
  return word.split("").map((ch) => {
    if (!/[a-z]/i.test(ch)) return ch === " " ? "  " : ch;
    count += 1;
    return count <= shown ? ch : "_";
  }).join(" ");
}

// Bold every occurrence of the word inside its example sentence.
function highlight(example: string, word: string): ReactNode {
  const escaped = word.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!escaped) return example;
  const parts = example.split(new RegExp(`(${escaped})`, "ig"));
  return parts.map((part, i) => (part.toLowerCase() === word.trim().toLowerCase() ? <b key={i}>{part}</b> : part));
}

export default function LessonPlayer({
  words,
  pool,
  title,
  reviewKey,
  review = false,
  onReview,
  onClose,
}: {
  words: Vocabulary[];
  // All of the learner's words, used as wrong options in the multiple-choice exercises.
  pool?: Vocabulary[];
  title: string;
  // "Cần ôn" list: wrong answers are added to it, right answers taken off.
  reviewKey: string;
  // Practising words from the "Cần ôn" list rather than learning new ones.
  review?: boolean;
  onReview: (word: Vocabulary, rating: ReviewRating) => Promise<void>;
  onClose: () => void;
}) {
  const [round, setRound] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [lessonIds, setLessonIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState(0);
  // Flip back to the meaning while writing (the example hides the word itself).
  const [peek, setPeek] = useState(false);
  // Intro card: English side first; "Tiếp tục" unlocks once the Vietnamese side has been seen.
  const [flipped, setFlipped] = useState(false);
  const [seenBack, setSeenBack] = useState(false);
  const [picked, setPicked] = useState<number[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [tally, setTally] = useState({ correct: 0, wrong: 0 });
  const retries = useRef<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const usedIds = useRef<Set<string>>(new Set());
  const [reviewIds] = useReviewIds(reviewKey);
  const [soundOn, toggleSound] = useSoundOn();

  const allWords = pool && pool.length ? pool : words;
  const byId = useMemo(() => new Map([...allWords, ...words].map((w) => [w.id, w])), [allWords, words]);

  // Each round picks the next batch of words, skipping ones from earlier rounds.
  // usedIds only changes in startNextRound, so running this effect twice (React dev mode) is harmless.
  useEffect(() => {
    const remaining = words.filter((w) => !usedIds.current.has(w.id));
    const chosenWords = pickLessonWords(remaining.length ? remaining : words);
    const canSpeak = pronounceSupport() === "ok";
    setLessonIds(chosenWords.map((w) => w.id));
    setSteps(chosenWords.flatMap((w, k) => {
      const list: Step[] = [{ kind: "intro", id: w.id }];
      const practice = practiceStep(w, k + round, allWords);
      if (practice) list.push(practice);
      list.push({ kind: "write", id: w.id });
      if (canSpeak && k % 2 === 1) list.push({ kind: "speak", id: w.id });
      return list;
    }));
    setIndex(0);
    setTally({ correct: 0, wrong: 0 });
    retries.current = {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  // Lock page scroll while the lesson covers the screen.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  const step = steps[index];
  const word = step ? byId.get(step.id) : undefined;
  const finished = steps.length > 0 && index >= steps.length;
  const isChoice = !!step && CHOICE_KINDS.includes(step.kind);

  useEffect(() => {
    if (finished) playSound("celebrate");
  }, [finished]);
  const progress = steps.length ? Math.min(100, (index / steps.length) * 100) : 0;
  // Appending a retry step must not reset the step on screen, so effects key off this.
  const stepKey = step ? `${round}-${index}-${step.kind}-${step.id}` : "";

  // Reset per-step state; listening steps play the word by themselves.
  useEffect(() => {
    if (!word) return;
    setInput("");
    setHint(0);
    setPeek(false);
    setFlipped(false);
    setSeenBack(false);
    setPicked([]);
    setChosen(null);
    setListening(false);
    setMicError("");
    setResult(null);
    if (step?.kind !== "write" && step?.kind !== "listen") return;
    const timer = window.setTimeout(() => speakEnglish(word.word), 350);
    const focus = window.setTimeout(() => inputRef.current?.focus(), 380);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(focus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepKey]);

  const flipIntro = useCallback(() => {
    // Read the word aloud when turning to the meaning side, not when turning back.
    if (!flipped && word) speakEnglish(word.word);
    playSound("flip");
    setFlipped(!flipped);
    setSeenBack(true);
  }, [flipped, word]);

  // "Mình đã thuộc từ này": count it as learned and drop its remaining steps.
  const markKnown = useCallback(() => {
    if (!word) return;
    void onReview(word, 3).catch(() => {});
    playSound("correct");
    removeReviewId(reviewKey, word.id);
    setSteps((s) => s.filter((st, i) => i <= index || st.id !== word.id));
    setResult(null);
    setIndex((i) => i + 1);
  }, [index, onReview, reviewKey, word]);

  const next = useCallback(() => {
    setResult(null);
    setIndex((i) => i + 1);
  }, []);

  // Shared grading for every exercise type.
  const grade = useCallback((correct: boolean, answer: string, extra: Partial<Result> = {}) => {
    if (!word || !step) return;
    setResult({ correct, answer, ...extra });
    playSound(correct ? "correct" : "wrong");
    // Let the chime finish before the word is read.
    const spoken = word.word;
    window.setTimeout(() => speakEnglish(spoken), 320);
    // Pronunciation is scored on its own and doesn't affect what you "know".
    if (step.kind === "speak") return;
    setTally((t) => ({ correct: t.correct + (correct ? 1 : 0), wrong: t.wrong + (correct ? 0 : 1) }));
    if (step.kind === "write") {
      void onReview(word, correct ? 2 : 0).catch(() => {});
      if (correct) removeReviewId(reviewKey, word.id);
    }
    if (!correct) {
      addReviewId(reviewKey, word.id);
      const key = `${word.id}:${step.kind}`;
      const used = retries.current[key] ?? 0;
      if (used < MAX_RETRIES) {
        retries.current[key] = used + 1;
        const retry: Step = { ...step, options: step.options && shuffle(step.options), letters: step.letters && scrambleLetters(word.word.trim()) };
        setSteps((s) => [...s, retry]);
      }
    }
  }, [onReview, reviewKey, step, word]);

  const check = useCallback(() => {
    // Read the field itself: with a Vietnamese IME the last keystrokes may still be composing.
    const answer = inputRef.current?.value ?? input;
    if (!word || result || !answer.trim()) return;
    setInput(answer);
    grade(normalize(answer) === normalize(word.word), answer);
  }, [grade, input, result, word]);

  const choose = useCallback((optionId: string) => {
    if (!word || !step || result) return;
    const option = byId.get(optionId);
    setChosen(optionId);
    grade(optionId === word.id, step.kind === "choose" ? option?.meaning ?? "" : option?.word ?? "");
  }, [byId, grade, result, step, word]);

  // Scramble: tap tiles in order; it checks itself once every tile is used.
  const pickTile = useCallback((tile: number) => {
    if (!step?.letters || result || picked.includes(tile)) return;
    const nextPicked = [...picked, tile];
    setPicked(nextPicked);
    playSound("tap");
    if (word && nextPicked.length === step.letters.length) {
      const answer = nextPicked.map((i) => step.letters![i]).join("");
      grade(answer === word.word.trim().toLowerCase(), answer);
    }
  }, [grade, picked, result, step, word]);

  const startSpeak = useCallback(async () => {
    if (!word || listening || result) return;
    setListening(true);
    setMicError("");
    try {
      const heard = await listenOnce();
      setListening(false);
      if (!heard.length) { setMicError("Chưa nghe thấy gì, thử nói to hơn nhé."); return; }
      const scored = scorePronunciation(heard, word.word);
      grade(scored.passed, scored.text, { score: scored.score });
    } catch (err) {
      setListening(false);
      setMicError(pronounceErrorMessage(err));
    }
  }, [grade, listening, result, word]);

  const retrySpeak = () => {
    setResult(null);
    setMicError("");
  };

  // Shortcuts: Enter continue/check, Tab flips (intro) or shows the meaning (writing),
  // 1–4 pick an answer, letters build the scramble, Space / Shift+Space replay, Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (finished || !word || !step) return;
      const target = e.target as HTMLElement;
      const writing = step.kind === "write" && !result;
      const isSpace = e.code === "Space" || e.key === " ";

      if (isSpace && e.shiftKey) { e.preventDefault(); speakEnglish(word.word); return; }
      if (e.key === "Tab" && step.kind === "intro") {
        e.preventDefault();
        flipIntro();
        return;
      }
      if (e.key === "Tab" && writing) {
        e.preventDefault();
        setPeek((v) => !v);
        inputRef.current?.focus();
        return;
      }
      if (!result && isChoice && /^[1-4]$/.test(e.key)) {
        const optionId = step.options?.[Number(e.key) - 1];
        if (optionId) { e.preventDefault(); choose(optionId); }
        return;
      }
      if (!result && step.kind === "scramble") {
        if (e.key === "Backspace") { e.preventDefault(); setPicked((p) => p.slice(0, -1)); return; }
        if (/^[a-z]$/i.test(e.key)) {
          const tile = step.letters?.findIndex((ch, i) => ch === e.key.toLowerCase() && !picked.includes(i)) ?? -1;
          if (tile >= 0) { e.preventDefault(); pickTile(tile); }
          return;
        }
      }
      if (isSpace) {
        // Spaces inside an answer like "break time" must still be typed.
        if (writing && target === inputRef.current && inputRef.current.value.trim()) return;
        e.preventDefault();
        if (writing) setPeek((v) => !v);
        // Reading the word aloud would give away the cloze answer.
        else if (step.kind !== "cloze" || result) speakEnglish(word.word);
        return;
      }

      // While an IME (Telex, VNI…) is composing, Chrome reports key "Process"; the physical code is still Enter.
      const isEnter = e.key === "Enter" || e.code === "Enter" || e.code === "NumpadEnter";
      // The main action buttons handle Enter themselves; on any other focused button
      // (speaker, hint, sound toggle…) Enter still drives the lesson instead of re-clicking it.
      if (!isEnter || target.closest(".lesson-btn, .lesson-known")) return;
      e.preventDefault();
      if (step.kind === "intro") {
        if (seenBack) next();
        else flipIntro();
      } else if (result) next();
      else if (step.kind === "write") check();
      else if (step.kind === "speak") void startSpeak();
    };
    // Space on a focused button would click it on key release.
    const onKeyUp = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.key === " ") && (e.target as HTMLElement).tagName === "BUTTON") e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [check, choose, finished, flipIntro, isChoice, next, onClose, pickTile, picked, result, seenBack, startSpeak, step, word]);

  const learned = lessonIds.map((id) => byId.get(id)).filter(Boolean) as Vocabulary[];
  const accuracy = tally.correct + tally.wrong ? Math.round((tally.correct / (tally.correct + tally.wrong)) * 100) : 100;
  const moreLeft = words.some((w) => !usedIds.current.has(w.id) && !lessonIds.includes(w.id));

  function startNextRound() {
    lessonIds.forEach((id) => usedIds.current.add(id));
    setRound((r) => r + 1);
  }

  const resultWhat = step?.kind === "speak" ? "Máy nghe được" : step?.kind === "write" ? "Bạn viết" : step?.kind === "scramble" ? "Bạn xếp" : "Bạn chọn";

  return (
    <div className="lesson" role="dialog" aria-modal="true" aria-label={`Bài học ${title}`}>
      <LessonBackdrop />
      <div className="lesson-main">
        <header className="lesson-top">
          <button className="lesson-close" onClick={onClose} aria-label="Thoát bài học"><X size={24} /></button>
          <button className="lesson-close lesson-sound" onClick={toggleSound} aria-label={soundOn ? "Tắt hiệu ứng âm thanh" : "Bật hiệu ứng âm thanh"} title={soundOn ? "Tắt hiệu ứng âm thanh" : "Bật hiệu ứng âm thanh"}>{soundOn ? <Volume2 size={22} /> : <VolumeX size={22} />}</button>
          <div className="lesson-progress">
            <span style={{ width: `${finished ? 100 : progress}%` }} />
            <i className="lesson-rider" style={{ left: `${finished ? 100 : progress}%` }}>
              <SootBuddy size={40} mood={result ? (result.correct ? "happy" : "error") : "idle"} look={{ bloom: "yellow" }} />
            </i>
          </div>
        </header>

        {!words.length && (
          <div className="lesson-body lesson-empty">
            <SootBuddy size={80} mood="curious" tool="magnifier" look={{ hat: true }} />
            <h2>Bộ này chưa có từ nào</h2>
            <p>Thêm từ vựng vào bộ trước rồi quay lại học nhé.</p>
            <button className="lesson-btn" onClick={onClose}>Quay lại</button>
          </div>
        )}

        {word && step.kind === "intro" && (
          <>
            <div className="lesson-body" key={`intro-${index}`}>
              <p className="lesson-prompt">{review ? "Ôn lại từ chưa thuộc" : PROMPTS.intro}</p>
              <div className={`lesson-flip${flipped ? " is-flipped" : ""}`}>
                <SpeakButtons text={word.word} />
                <div className="lesson-flip-inner" onClick={flipIntro} role="button" tabIndex={-1} aria-label="Lật thẻ">
                  <div className="lesson-face front">
                    {word.image_url && <img src={word.image_url} alt="" />}
                    {word.example ? (
                      <p className="lesson-example">{highlight(word.example, word.word)}</p>
                    ) : (
                      <p className="lesson-example solo"><b>{word.word}</b></p>
                    )}
                    <span className="lesson-tap" aria-hidden="true">👆</span>
                  </div>
                  <div className="lesson-face back">
                    <h1>{word.word}</h1>
                    {word.pronunciation && <div className="lesson-ipa">{word.pronunciation}</div>}
                    <div className="lesson-meaning">{word.meaning}{word.part_of_speech && <small> ({word.part_of_speech})</small>}</div>
                    {word.example_translation && <p className="lesson-translation">{word.example_translation}</p>}
                    {word.note && <div className="lesson-note">💡 {word.note}</div>}
                    {flipped && <PronounceButton word={word.word} />}
                    <span className="lesson-tap" aria-hidden="true">👆</span>
                  </div>
                </div>
              </div>
            </div>
            <footer className="lesson-foot">
              <button className="lesson-btn" disabled={!seenBack} onClick={next}>Tiếp tục <ArrowRight size={18} /><kbd>Enter ↵</kbd></button>
              <button className="lesson-known" onClick={markKnown}>Mình đã thuộc từ này</button>
              <KeyLegend items={[["Tab", "lật thẻ"], ["Enter", seenBack ? "từ tiếp theo" : "lật thẻ"], ["Space", "nghe lại"], ["Esc", "thoát"]]} />
            </footer>
          </>
        )}

        {word && isChoice && (
          <>
            <div className="lesson-body" key={`choice-${index}`}>
              <p className="lesson-prompt">{PROMPTS[step.kind]}</p>
              {step.kind === "choose" && (
                <div className="lesson-question">
                  <h1>{word.word}</h1>
                  {word.pronunciation && <div className="lesson-ipa">{word.pronunciation}</div>}
                  <button className="audio-slow" onClick={() => speakEnglish(word.word)} aria-label="Nghe"><Volume2 size={22} /></button>
                </div>
              )}
              {step.kind === "listen" && (
                <div className="lesson-audio">
                  <button className="audio-big" onClick={() => speakEnglish(word.word)} aria-label="Nghe lại"><Volume2 size={40} /></button>
                  <button className="audio-slow" onClick={() => speakEnglish(word.word, SLOW_RATE)} aria-label="Nghe chậm" title="Nghe chậm">🐌</button>
                </div>
              )}
              {step.kind === "cloze" && (
                <div className="lesson-question cloze">
                  <p>{result ? highlight(word.example ?? "", word.word) : clozeSentence(word.example ?? "", word.word)}</p>
                  {word.example_translation && <span>{word.example_translation}</span>}
                </div>
              )}
              <div className="lesson-options">
                {step.options?.map((id, i) => {
                  const option = byId.get(id);
                  if (!option) return null;
                  const state = result ? (id === word.id ? "right" : id === chosen ? "wrong" : "dim") : "";
                  return (
                    <button key={id} className={`lesson-option ${state}`} disabled={!!result} onClick={() => choose(id)}>
                      <kbd>{i + 1}</kbd>
                      <span>{step.kind === "choose" ? option.meaning : option.word}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {!result && (
              <footer className="lesson-foot">
                <KeyLegend items={[["1–4", "chọn đáp án"], ...(step.kind === "cloze" ? [] : [["Space", "nghe lại"] as [string, string]]), ["Esc", "thoát"]]} />
              </footer>
            )}
          </>
        )}

        {word && step.kind === "scramble" && step.letters && (
          <>
            <div className="lesson-body" key={`scramble-${index}`}>
              <p className="lesson-prompt">{PROMPTS.scramble}</p>
              <div className="lesson-question">
                <div className="lesson-meaning">{word.meaning}{word.part_of_speech && <small> ({word.part_of_speech})</small>}</div>
              </div>
              <div className="scramble-slots" aria-live="polite">
                {step.letters.map((_, i) => {
                  const tile = picked[i];
                  return <span key={i} className={`scramble-slot${tile !== undefined ? " filled" : ""}`}>{tile !== undefined ? step.letters![tile] : ""}</span>;
                })}
              </div>
              <div className="scramble-tiles">
                {step.letters.map((ch, i) => (
                  <button key={i} className="scramble-tile" disabled={picked.includes(i) || !!result} onClick={() => pickTile(i)}>{ch}</button>
                ))}
              </div>
              {!result && <button className="lesson-hint-btn" disabled={!picked.length} onClick={() => setPicked((p) => p.slice(0, -1))}><RotateCcw size={15} /> Xoá chữ cuối</button>}
            </div>
            {!result && (
              <footer className="lesson-foot">
                <KeyLegend items={[["A–Z", "gõ chữ"], ["Backspace", "xoá"], ["Space", "nghe gợi ý"], ["Esc", "thoát"]]} />
              </footer>
            )}
          </>
        )}

        {word && step.kind === "write" && (
          <>
            <div className="lesson-body" key={`write-${index}`}>
              <p className="lesson-prompt">{peek && !result ? "Nghĩa của từ" : PROMPTS.write}</p>
              {peek && !result ? (
                <div className="lesson-peek">
                  <div className="lesson-meaning">{word.meaning}</div>
                  {word.part_of_speech && <span className="lesson-peek-pos">{word.part_of_speech}</span>}
                  {word.example && <blockquote>{maskWord(word.example, word.word)}{word.example_translation && <span>{word.example_translation}</span>}</blockquote>}
                </div>
              ) : (
                <div className="lesson-audio">
                  <button className="audio-big" onClick={() => speakEnglish(word.word)} aria-label="Nghe lại"><Volume2 size={40} /></button>
                  <button className="audio-slow" onClick={() => speakEnglish(word.word, SLOW_RATE)} aria-label="Nghe chậm" title="Nghe chậm">🐌</button>
                </div>
              )}
              <input
                ref={inputRef}
                className={`lesson-input${result ? (result.correct ? " is-correct" : " is-wrong") : ""}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                readOnly={!!result}
                placeholder="Gõ từ bạn nghe được…"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              {hint > 0 && !result && <div className="lesson-hint">{hintMask(word.word, hint)}</div>}
              {!result && (
                <div className="lesson-tools">
                  <button className={`lesson-hint-btn${peek ? " on" : ""}`} onClick={() => { setPeek((v) => !v); inputRef.current?.focus(); }}><BookOpen size={15} /> {peek ? "Quay lại nghe" : "Xem nghĩa"} <kbd>Tab</kbd></button>
                  <button className="lesson-hint-btn" onClick={() => { setHint((h) => h + 1); inputRef.current?.focus(); }}><Lightbulb size={15} /> Gợi ý</button>
                </div>
              )}
            </div>
            {!result && (
              <footer className="lesson-foot">
                <button className="lesson-btn" disabled={!input.trim()} onClick={check}>Kiểm tra<kbd>Enter ↵</kbd></button>
                <KeyLegend items={[["Enter", "kiểm tra"], ["Tab", "xem nghĩa"], ["Shift+Space", "nghe lại"], ["Esc", "thoát"]]} />
              </footer>
            )}
          </>
        )}

        {word && step.kind === "speak" && (
          <>
            <div className="lesson-body" key={`speak-${index}`}>
              <p className="lesson-prompt">{PROMPTS.speak}</p>
              <div className="lesson-question">
                <h1>{word.word}</h1>
                {word.pronunciation && <div className="lesson-ipa">{word.pronunciation}</div>}
                <SpeakButtons text={word.word} />
              </div>
              <button className={`lesson-mic${listening ? " listening" : ""}`} onClick={() => void startSpeak()} disabled={!!result} aria-label="Bấm rồi đọc to">
                {listening ? <Loader2 className="spin" size={40} /> : <Mic size={40} />}
              </button>
              <p className="lesson-mic-hint">{listening ? "Đang nghe… hãy đọc to từ này" : micError || "Bấm micro (hoặc Enter) rồi đọc to"}</p>
            </div>
            {!result && (
              <footer className="lesson-foot">
                <button className="lesson-known" onClick={next}>Bỏ qua bước này</button>
                <KeyLegend items={[["Enter", "bắt đầu nói"], ["Space", "nghe mẫu"], ["Esc", "thoát"]]} />
              </footer>
            )}
          </>
        )}

        {finished && (
          <div className="lesson-body lesson-done">
            <div className="soot-crew-row">
              <SootBuddy size={60} mood="happy" look={{ bloom: "green", holdL: "star-pink" }} />
              <SootBuddy size={84} mood="happy" look={{ hat: true, holdR: "star-yellow" }} sign={`${accuracy}%`} signTone="good" />
              <SootBuddy size={60} mood="happy" look={{ bloom: "pink", holdR: "flower-yellow" }} />
            </div>
            <h2>{review ? "Ôn xong rồi!" : "Hoàn thành bài học!"}</h2>
            <p>Bạn vừa {review ? "ôn" : "học"} {learned.length} từ trong <b>{title}</b> · {tally.correct} câu đúng, {tally.wrong} câu sai.</p>
            {review && <p className="lesson-review-left">{reviewIds.length ? `Sổ “Cần ôn” còn ${reviewIds.length} từ — từ làm sai vẫn được giữ lại để ôn tiếp.` : "Sổ “Cần ôn” đã trống. Tuyệt vời!"}</p>}
            <div className="lesson-learned">
              {learned.map((w) => (
                <div key={w.id}>
                  <button className="sound-mini" onClick={() => speakEnglish(w.word)} aria-label={`Phát âm ${w.word}`}><Volume2 size={15} /></button>
                  <strong>{w.word}</strong>
                  <span>{w.meaning}</span>
                </div>
              ))}
            </div>
            <div className="lesson-done-actions">
              {moreLeft && <button className="lesson-btn" onClick={startNextRound}>Học tiếp <ArrowRight size={18} /></button>}
              <button className="lesson-btn ghost" onClick={onClose}>Về trang chủ</button>
            </div>
          </div>
        )}
      </div>

      {word && step && result && (
        <div className="lesson-sheet-wrap">
          <PeekCrew
            members={SHEET_CREW}
            mood={result.correct ? "happy" : "error"}
            signs={[result.correct ? "Chính xác!" : "Sai rồi!"]}
            signTone={result.correct ? "good" : "bad"}
            bubble="♪"
            cheer={result.correct ? index + 1 : 0}
            ledge={76}
          >
            <section className={`lesson-sheet ${result.correct ? "good" : "bad"}`}>
              <div className="lesson-sheet-inner">
                <div className="lesson-sheet-head">
                  {result.correct ? <Check size={22} /> : <X size={22} />}
                  <strong>{step.kind === "speak" ? (result.correct ? "Phát âm chuẩn!" : "Chưa chuẩn lắm") : result.correct ? "Chính xác!" : "Chưa đúng rồi"}</strong>
                </div>
                {(!result.correct || step.kind === "speak") && (
                  <div className="lesson-diff">
                    <span>{resultWhat}:</span>{" "}
                    {step.kind === "write" || step.kind === "scramble" ? <Diff answer={result.answer} target={word.word} /> : <b>“{result.answer}”{result.score !== undefined && ` · ${result.score}%`}</b>}
                  </div>
                )}
                <div className="lesson-sheet-word">
                  <button className="sheet-audio" onClick={() => speakEnglish(word.word)} aria-label="Nghe lại"><Volume2 size={22} /></button>
                  <div>
                    <h3>{word.word}{word.part_of_speech && ` (${word.part_of_speech})`}</h3>
                    {word.pronunciation && <div>{word.pronunciation}</div>}
                    <div>{word.meaning}</div>
                    {word.example && <p>{highlight(word.example, word.word)}</p>}
                  </div>
                </div>
                <div className="lesson-sheet-actions">
                  {step.kind === "speak" && !result.correct && <button className="lesson-btn ghost-light" onClick={retrySpeak}><Mic size={17} /> Thử lại</button>}
                  <button className="lesson-btn light" onClick={next} autoFocus>Tiếp tục<kbd>Enter ↵</kbd></button>
                </div>
              </div>
            </section>
          </PeekCrew>
        </div>
      )}
    </div>
  );
}

// Blurred soot sprites drifting on both sides of the lesson column.
const BACKDROP_LOOKS: Look[] = [{ bloom: "pink" }, { hat: true }, {}, { bloom: "yellow", holdR: "star-pink" }, { bloom: "green" }, { hat: true, holdL: "star-yellow" }];
const BACKDROP_SPOTS = [
  [4, 12, 34], [12, 34, 22], [3, 56, 42], [13, 74, 26], [6, 90, 30], [16, 6, 18],
  [88, 10, 30], [95, 28, 22], [85, 46, 38], [94, 64, 26], [87, 84, 34], [97, 94, 20],
];

function LessonBackdrop() {
  return (
    <div className="lesson-backdrop" aria-hidden="true">
      {BACKDROP_SPOTS.map(([left, top, size], i) => (
        <span
          key={i}
          className="dust soot-track"
          style={{ left: `${left}%`, top: `${top}%`, "--s": `${size}px`, "--i": i, "--wander": `dust-wander-${i % 3}`, "--dur": `${10 + (i % 4) * 2}s`, "--d": `${-(i * 1.3) % 8}s` } as CSSProperties}
        >
          <span className="dust-gather"><span className="dust-move"><span className="dust-bob"><span className="dust-jump">
            <SootSprite look={BACKDROP_LOOKS[i % BACKDROP_LOOKS.length]} />
          </span></span></span></span>
        </span>
      ))}
    </div>
  );
}

// Hide the word inside its example so peeking at the meaning doesn't give away the spelling.
function maskWord(example: string, word: string) {
  const escaped = word.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped ? example.replace(new RegExp(escaped, "ig"), (m) => "_".repeat(m.length)) : example;
}

// The example sentence with a fixed-width blank where the word goes.
function clozeSentence(example: string, word: string): ReactNode {
  const escaped = word.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!escaped) return example;
  const parts = example.split(new RegExp(`(${escaped})`, "ig"));
  return parts.map((part, i) => (part.toLowerCase() === word.trim().toLowerCase() ? <span key={i} className="cloze-blank" aria-label="chỗ trống" /> : part));
}

function KeyLegend({ items }: { items: [string, string][] }) {
  return (
    <p className="lesson-keys">
      {items.map(([key, label]) => <span key={key}><kbd>{key}</kbd> {label}</span>)}
    </p>
  );
}

function SpeakButtons({ text }: { text: string }) {
  return (
    <div className="lesson-speak">
      <button onClick={() => speakEnglish(text)} aria-label="Nghe"><Volume2 size={24} /></button>
      <button className="slow" onClick={() => speakEnglish(text, SLOW_RATE)} aria-label="Nghe chậm" title="Nghe chậm">🐌</button>
    </div>
  );
}

// Letter-by-letter comparison of the learner's answer against the target.
function Diff({ answer, target }: { answer: string; target: string }) {
  const a = answer.trim();
  const t = target.trim();
  return (
    <span className="diff">
      {a.split("").map((ch, i) => (
        <i key={i} className={ch.toLowerCase() === (t[i] ?? "").toLowerCase() ? "ok" : "bad"}>{ch === " " ? " " : ch}</i>
      ))}
      {t.length > a.length && <i className="missing">{"_".repeat(t.length - a.length)}</i>}
      <em>→ {t}</em>
    </span>
  );
}
