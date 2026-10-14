"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeftRight, Check, Keyboard, Lightbulb, NotebookPen, RotateCcw, Shuffle, Volume2, X } from "lucide-react";
import type { ReviewRating, Vocabulary } from "@/lib/types";
import { speakEnglish } from "@/lib/speech";
import { isDue } from "@/lib/srs";
import { PeekCrew, SootBuddy, type CrewMember, type SignTone, type SootMood } from "./Soot";

type Mode = "due" | "review" | "all";
type Verdict = "known" | "unknown";
type Prefs = { shuffle: boolean; reverse: boolean; autoSpeak: boolean };
type Reaction = { mood: SootMood; signs?: (string | undefined)[]; tone?: SignTone };

const STUDY_CREW: CrewMember[] = [
  { x: 12, size: 70, look: { bloom: "green" }, tool: "magnifier" },
  { x: 30, size: 90, look: { hat: true }, tool: "binoculars", bubble: true },
  { x: 70, size: 96, look: { bloom: "pink", holdR: "star-yellow" }, tool: "spyglass", bubble: true },
  { x: 88, size: 70, look: { bloom: "yellow" }, tool: "binoculars" },
];

const KNOWN_REACTION: Reaction = { mood: "happy", signs: [undefined, undefined, "Giỏi lắm!", undefined], tone: "good" };
const UNKNOWN_REACTION: Reaction = { mood: "error", signs: ["Oops!", undefined, "Ôn lại nhé!", undefined], tone: "bad" };

const PREFS_KEY = "tv-english-flashcard-prefs";
const DEFAULT_PREFS: Prefs = { shuffle: false, reverse: false, autoSpeak: true };
const SWIPE_DISTANCE = 110;

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// "apricot" -> "a p _ _ _ _ _" with `shown` letters revealed.
function hintMask(word: string, shown: number) {
  let count = 0;
  return word.split("").map((ch) => {
    if (!/[a-z]/i.test(ch)) return ch;
    count += 1;
    return count <= shown ? ch : "_";
  }).join(" ");
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export default function FlashcardStudy({
  words,
  reviewKey,
  onReview,
  onSaveNote,
}: {
  // Words in the selected deck.
  words: Vocabulary[];
  // localStorage key for the "Cần ôn" list of words marked as not yet learned.
  reviewKey: string;
  onReview: (word: Vocabulary, rating: ReviewRating) => Promise<void>;
  onSaveNote: (word: Vocabulary, note: string) => Promise<void>;
}) {
  const [mode, setMode] = useState<Mode>("due");
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState<{ id: string; verdict: Verdict }[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(0);
  const [exit, setExit] = useState<Verdict | null>(null);
  const [dragX, setDragX] = useState(0);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [cheer, setCheer] = useState(0);
  const [noteDraft, setNoteDraft] = useState<string | null>(null);
  const [savingNote, setSavingNote] = useState(false);
  const [restart, setRestart] = useState(0);
  const [customIds, setCustomIds] = useState<string[] | null>(null);

  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const reactionTimer = useRef(0);
  const reviewIdsRef = useRef<string[]>([]);
  reviewIdsRef.current = reviewIds;

  const byId = useMemo(() => new Map(words.map((w) => [w.id, w])), [words]);
  // Grading changes a word's review dates but not the set of ids, so sessions survive it.
  const idSignature = useMemo(() => words.map((w) => w.id).sort().join(","), [words]);
  const dueCount = useMemo(() => words.filter(isDue).length, [words]);
  const reviewCount = useMemo(() => reviewIds.filter((id) => byId.has(id)).length, [reviewIds, byId]);

  useEffect(() => {
    setPrefs(readJson(PREFS_KEY, DEFAULT_PREFS));
  }, []);

  useEffect(() => {
    try {
      setReviewIds(JSON.parse(localStorage.getItem(reviewKey) || "[]"));
    } catch {
      setReviewIds([]);
    }
  }, [reviewKey]);

  useEffect(() => () => window.clearTimeout(reactionTimer.current), []);

  const updatePrefs = (patch: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      try { localStorage.setItem(PREFS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const updateReviewIds = useCallback((fn: (ids: string[]) => string[]) => {
    setReviewIds((prev) => {
      const next = fn(prev);
      try { localStorage.setItem(reviewKey, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [reviewKey]);

  // Build a new session whenever the mode, deck or "restart" changes.
  useEffect(() => {
    let ids: string[];
    if (customIds) ids = customIds.filter((id) => byId.has(id));
    else if (mode === "due") ids = words.filter(isDue).map((w) => w.id);
    else if (mode === "review") ids = reviewIdsRef.current.filter((id) => byId.has(id));
    else ids = words.map((w) => w.id);
    if (prefs.shuffle) ids = shuffled(ids);
    setQueue(ids);
    setTotal(ids.length);
    setResults([]);
    setRevealed(false);
    setHint(0);
    setNoteDraft(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, idSignature, restart, customIds]);

  const current = queue.length ? byId.get(queue[0]) : undefined;
  const finished = total > 0 && !current;

  const react = (next: Reaction, celebrate: boolean) => {
    setReaction(next);
    if (celebrate) setCheer((v) => v + 1);
    window.clearTimeout(reactionTimer.current);
    reactionTimer.current = window.setTimeout(() => setReaction(null), 1300);
  };

  const flip = useCallback(() => {
    if (!current) return;
    setRevealed((was) => {
      if (!was && prefs.autoSpeak) speakEnglish(current.word);
      return !was;
    });
  }, [current, prefs.autoSpeak]);

  const grade = useCallback((verdict: Verdict) => {
    if (!current || exit) return;
    const word = current;
    setExit(verdict);
    setNoteDraft(null);
    react(verdict === "known" ? KNOWN_REACTION : UNKNOWN_REACTION, verdict === "known");
    setResults((prev) => [...prev, { id: word.id, verdict }]);
    updateReviewIds((ids) => verdict === "unknown"
      ? (ids.includes(word.id) ? ids : [...ids, word.id])
      : ids.filter((id) => id !== word.id));
    void onReview(word, verdict === "known" ? 2 : 0).catch(() => {});
    window.setTimeout(() => {
      setQueue((q) => q.slice(1));
      setRevealed(false);
      setHint(0);
      setExit(null);
      setDragX(0);
    }, 280);
  }, [current, exit, onReview, updateReviewIds]);

  // Keyboard: Space/Enter flip, ← not yet, → learned, S speak, H hint.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (!current) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowLeft" || e.key === "1") grade("unknown");
      else if (e.key === "ArrowRight" || e.key === "2") grade("known");
      else if (e.key.toLowerCase() === "s") speakEnglish(current.word);
      else if (e.key.toLowerCase() === "h" && prefs.reverse) setHint((h) => h + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, flip, grade, prefs.reverse]);

  // Swipe the card: right = learned, left = not yet. A tap without movement flips it.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, textarea, input, a") || exit) return;
    drag.current = { x: e.clientX, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    setDragX(dx);
  };
  const onPointerUp = () => {
    const state = drag.current;
    drag.current = null;
    if (!state) return;
    if (Math.abs(dragX) > SWIPE_DISTANCE) grade(dragX > 0 ? "known" : "unknown");
    else {
      setDragX(0);
      if (!state.moved) flip();
    }
  };

  async function saveNote() {
    if (!current || noteDraft === null) return;
    setSavingNote(true);
    try {
      await onSaveNote(current, noteDraft);
      setNoteDraft(null);
    } finally {
      setSavingNote(false);
    }
  }

  function switchMode(next: Mode) {
    setCustomIds(null);
    setMode(next);
    setRestart((v) => v + 1);
  }

  const known = results.filter((r) => r.verdict === "known").length;
  const unknownIds = results.filter((r) => r.verdict === "unknown").map((r) => r.id);
  const position = Math.min(total, results.length + 1);

  const tabs: { id: Mode; label: string; count: number }[] = [
    { id: "due", label: "Đến hạn", count: dueCount },
    { id: "review", label: "Cần ôn", count: reviewCount },
    { id: "all", label: "Tất cả", count: words.length },
  ];

  const stamp = Math.min(1, Math.abs(dragX) / SWIPE_DISTANCE);
  const cardStyle = exit ? undefined : { transform: `translateX(${dragX}px) rotate(${dragX / 18}deg)`, transition: drag.current ? "none" : undefined };

  return (
    <div className="study-shell fc-shell">
      <div className="fc-toolbar">
        <div className="fc-tabs" role="tablist" aria-label="Chế độ học">
          {tabs.map((tab) => (
            <button key={tab.id} role="tab" aria-selected={mode === tab.id && !customIds} className={mode === tab.id && !customIds ? "active" : ""} onClick={() => switchMode(tab.id)}>
              {tab.label}<b>{tab.count}</b>
            </button>
          ))}
        </div>
        <div className="fc-options">
          <button className={prefs.shuffle ? "on" : ""} onClick={() => updatePrefs({ shuffle: !prefs.shuffle })} title="Xáo thẻ ở phiên tiếp theo"><Shuffle size={15} /> Xáo</button>
          <button className={prefs.reverse ? "on" : ""} onClick={() => { updatePrefs({ reverse: !prefs.reverse }); setRevealed(false); setHint(0); }} title="Đổi mặt trước của thẻ"><ArrowLeftRight size={15} /> {prefs.reverse ? "Việt → Anh" : "Anh → Việt"}</button>
          <button className={prefs.autoSpeak ? "on" : ""} onClick={() => updatePrefs({ autoSpeak: !prefs.autoSpeak })} title="Tự phát âm khi lật thẻ"><Volume2 size={15} /> Tự đọc</button>
        </div>
      </div>

      {total > 0 && !finished && (
        <div className="fc-progress">
          <span className="fc-count">Thẻ <strong>{position}</strong> / {total}</span>
          <div className="fc-bar" aria-hidden="true">
            {results.map((r, i) => <i key={i} className={r.verdict} style={{ width: `${100 / total}%` }} />)}
          </div>
          <span className="fc-tally"><em className="known"><Check size={13} /> {known}</em><em className="unknown"><X size={13} /> {unknownIds.length}</em></span>
        </div>
      )}

      {current && (
        <>
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
            <div className="fc-stage">
              <div
                key={current.id}
                className={`fc-card${revealed ? " is-flipped" : ""}${exit ? ` fly-${exit}` : ""}`}
                style={cardStyle}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <span className="fc-stamp known" style={{ opacity: dragX > 0 ? stamp : 0 }}>Đã thuộc</span>
                <span className="fc-stamp unknown" style={{ opacity: dragX < 0 ? stamp : 0 }}>Chưa thuộc</span>
                <div className="fc-inner">
                  <div className="fc-face fc-front">
                    <FaceBadges word={current} />
                    {prefs.reverse ? (
                      <div className="fc-center">
                        <h2 className="fc-meaning-big">{current.meaning}</h2>
                        {hint > 0 && <div className="fc-hint">{hintMask(current.word, hint)}</div>}
                        <button className="fc-hint-btn" onClick={() => setHint((h) => h + 1)}><Lightbulb size={15} /> Gợi ý chữ cái</button>
                      </div>
                    ) : (
                      <div className="fc-center">
                        <h1>{current.word}</h1>
                        {current.pronunciation && <div className="pronunciation">{current.pronunciation}</div>}
                      </div>
                    )}
                    <div className="fc-foot">Chạm để lật · vuốt phải nếu đã thuộc, trái nếu chưa</div>
                  </div>

                  <div className="fc-face fc-back">
                    <FaceBadges word={current} />
                    <div className="fc-center fc-answer">
                      {prefs.reverse ? (
                        <>
                          <h1>{current.word}</h1>
                          {current.pronunciation && <div className="pronunciation">{current.pronunciation}</div>}
                          <p className="fc-sub">{current.meaning}</p>
                        </>
                      ) : (
                        <>
                          <h2 className="fc-meaning-big">{current.meaning}</h2>
                          <p className="fc-sub">{current.word}{current.pronunciation ? ` · ${current.pronunciation}` : ""}</p>
                        </>
                      )}
                      {current.example && <blockquote>{current.example}{current.example_translation && <span>{current.example_translation}</span>}</blockquote>}
                      <div className="fc-note">
                        {noteDraft === null ? (
                          <button className="fc-note-view" onClick={() => setNoteDraft(current.note ?? "")}>
                            <NotebookPen size={15} />
                            <span>{current.note || "Thêm ghi chú để dễ nhớ hơn…"}</span>
                          </button>
                        ) : (
                          <div className="fc-note-edit">
                            <textarea autoFocus value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} placeholder="Mẹo nhớ, cách dùng, câu ví dụ của riêng bạn…" rows={3} />
                            <div>
                              <button className="button secondary compact" onClick={() => setNoteDraft(null)}>Huỷ</button>
                              <button className="button primary compact" disabled={savingNote} onClick={() => void saveNote()}>{savingNote ? "Đang lưu…" : "Lưu ghi chú"}</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PeekCrew>

          <div className="fc-actions">
            <button className="fc-btn unknown" disabled={!!exit} onClick={() => grade("unknown")}><X size={20} /> Chưa thuộc</button>
            <button className="fc-btn flip" onClick={flip}><RotateCcw size={17} /> {revealed ? "Mặt trước" : "Lật thẻ"}</button>
            <button className="fc-btn known" disabled={!!exit} onClick={() => grade("known")}><Check size={20} /> Đã thuộc</button>
          </div>
          <p className="fc-keys"><Keyboard size={14} /> <kbd>Space</kbd> lật · <kbd>←</kbd> chưa thuộc · <kbd>→</kbd> đã thuộc · <kbd>S</kbd> phát âm{prefs.reverse ? <> · <kbd>H</kbd> gợi ý</> : null}</p>
        </>
      )}

      {finished && (
        <div className="fc-summary">
          <div className="soot-crew-row">
            <SootBuddy size={56} mood="happy" look={{ bloom: "green", holdL: "star-pink" }} />
            <SootBuddy size={78} mood="happy" look={{ hat: true, holdR: "star-yellow" }} sign={`${known}/${total}`} signTone="good" />
            <SootBuddy size={56} mood="happy" look={{ bloom: "pink", holdR: "flower-yellow" }} />
          </div>
          <h2>Hoàn thành phiên học!</h2>
          <div className="fc-summary-stats">
            <span className="known"><Check size={16} /> Đã thuộc <strong>{known}</strong></span>
            <span className="unknown"><X size={16} /> Chưa thuộc <strong>{unknownIds.length}</strong></span>
            <span>Tỉ lệ <strong>{Math.round((known / total) * 100)}%</strong></span>
          </div>
          {unknownIds.length > 0 && (
            <div className="fc-review-list">
              <h3>Đã ghi vào sổ “Cần ôn”</h3>
              {unknownIds.map((id) => {
                const w = byId.get(id);
                if (!w) return null;
                return (
                  <div key={id} className="fc-review-row">
                    <button className="sound-mini" onClick={() => speakEnglish(w.word)} aria-label={`Phát âm ${w.word}`}><Volume2 size={15} /></button>
                    <strong>{w.word}</strong>
                    <span>{w.meaning}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="fc-summary-actions">
            {unknownIds.length > 0 && <button className="button primary" onClick={() => { setCustomIds(unknownIds); setRestart((v) => v + 1); }}><RotateCcw size={16} /> Học lại {unknownIds.length} từ chưa thuộc</button>}
            <button className="button secondary" onClick={() => setRestart((v) => v + 1)}>Học lại cả phiên</button>
            {mode !== "review" && reviewCount > 0 && <button className="button secondary" onClick={() => switchMode("review")}>Mở sổ Cần ôn ({reviewCount})</button>}
          </div>
        </div>
      )}

      {total === 0 && <EmptyState mode={mode} words={words.length} reviewCount={reviewCount} onSwitch={switchMode} />}
    </div>
  );
}

function FaceBadges({ word }: { word: Vocabulary }) {
  return (
    <div className="fc-top">
      <div className="flashcard-badges">
        {word.part_of_speech && <span>{word.part_of_speech}</span>}
        {word.tags?.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <button className="speak-btn" onClick={() => speakEnglish(word.word)} aria-label="Phát âm"><Volume2 size={20} /></button>
    </div>
  );
}

function EmptyState({ mode, words, reviewCount, onSwitch }: { mode: Mode; words: number; reviewCount: number; onSwitch: (m: Mode) => void }) {
  const copy = {
    due: { title: "Không còn thẻ nào đến hạn ✨", text: "Bạn đã ôn hết thẻ đến hạn. Luyện thêm toàn bộ từ hoặc ôn sổ “Cần ôn”." },
    review: { title: "Sổ “Cần ôn” đang trống", text: "Từ nào bạn bấm “Chưa thuộc” sẽ được ghi vào đây để ôn lại." },
    all: { title: "Chưa có từ vựng trong bộ này", text: "Thêm từ mới để bắt đầu học bằng flashcard." },
  }[mode];
  return (
    <div className="empty-study">
      <div className="soot-crew-row">
        <SootBuddy size={52} mood="happy" look={{ bloom: "green", holdL: "star-pink" }} />
        <SootBuddy size={72} mood={mode === "review" ? "curious" : "happy"} tool={mode === "review" ? "magnifier" : undefined} look={{ hat: true, holdR: "star-yellow" }} />
        <SootBuddy size={52} mood="happy" look={{ bloom: "pink", holdR: "flower-yellow" }} />
      </div>
      <h2>{copy.title}</h2>
      <p>{copy.text}</p>
      <div className="fc-summary-actions">
        {mode !== "all" && words > 0 && <button className="button primary" onClick={() => onSwitch("all")}>Luyện tất cả ({words})</button>}
        {mode !== "review" && reviewCount > 0 && <button className="button secondary" onClick={() => onSwitch("review")}>Ôn sổ Cần ôn ({reviewCount})</button>}
      </div>
    </div>
  );
}
