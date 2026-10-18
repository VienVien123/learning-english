"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, BookOpenCheck, Check, CircleAlert, Loader2, PenLine, RotateCcw, Search,
  Sparkles, Trophy, Volume2, Wand2, X,
} from "lucide-react";
import { GRAMMAR_LEVELS, GRAMMAR_TOPICS, isFillCorrect, type GrammarExercise, type GrammarLevel, type GrammarTopic } from "@/lib/grammar";
import type { GrammarSection } from "@/lib/grammar/types";
import { GRAMMAR_PASS_SCORE, useGrammarProgress, type GrammarRecord } from "@/lib/grammarProgress";
import { speakEnglish } from "@/lib/speech";
import { playSound } from "@/lib/sound";
import { SootBuddy } from "./Soot";

type Props = {
  userId: string;
  onActivity: (xp: number, correct: boolean) => void | Promise<void>;
};

type Screen = { kind: "home" } | { kind: "lesson"; topicId: string } | { kind: "practice"; topicId: string };

export default function GrammarView({ userId, onActivity }: Props) {
  const [screen, setScreen] = useState<Screen>({ kind: "home" });
  const { records, saveScore } = useGrammarProgress(userId);
  const topic = screen.kind === "home" ? null : GRAMMAR_TOPICS.find((t) => t.id === screen.topicId) ?? null;

  useEffect(() => { window.scrollTo({ top: 0 }); }, [screen]);

  if (!topic) return <GrammarHome records={records} open={(id) => setScreen({ kind: "lesson", topicId: id })} />;

  const index = GRAMMAR_TOPICS.indexOf(topic);
  const nextTopic = GRAMMAR_TOPICS[index + 1] ?? null;
  const prevTopic = GRAMMAR_TOPICS[index - 1] ?? null;

  if (screen.kind === "practice") {
    return (
      <Practice
        key={topic.id}
        topic={topic}
        record={records[topic.id]}
        onActivity={onActivity}
        onFinish={(score) => void saveScore(topic.id, score)}
        onExit={() => setScreen({ kind: "lesson", topicId: topic.id })}
        nextTopic={nextTopic}
        openTopic={(id) => setScreen({ kind: "lesson", topicId: id })}
      />
    );
  }

  return (
    <TopicLesson
      key={topic.id}
      topic={topic}
      number={index + 1}
      record={records[topic.id]}
      onBack={() => setScreen({ kind: "home" })}
      onPractice={() => setScreen({ kind: "practice", topicId: topic.id })}
      prevTopic={prevTopic}
      nextTopic={nextTopic}
      openTopic={(id) => setScreen({ kind: "lesson", topicId: id })}
    />
  );
}

function statusOf(record?: GrammarRecord) {
  if (record?.completed_at) return { tone: "done", label: `Hoàn thành · ${record.best_score}%` };
  if (record) return { tone: "tried", label: `Cao nhất ${record.best_score}%` };
  return { tone: "new", label: "Chưa học" };
}

// ---------------------------------------------------------------- Home

function GrammarHome({ records, open }: { records: Record<string, GrammarRecord>; open: (id: string) => void }) {
  const [level, setLevel] = useState<GrammarLevel | "all">("all");
  const [query, setQuery] = useState("");

  const done = GRAMMAR_TOPICS.filter((t) => records[t.id]?.completed_at).length;
  const percent = Math.round(done / Math.max(1, GRAMMAR_TOPICS.length) * 100);
  const nextUp = GRAMMAR_TOPICS.find((t) => !records[t.id]?.completed_at) ?? null;

  const q = query.trim().toLowerCase();
  const visible = GRAMMAR_TOPICS.filter((t) =>
    (level === "all" || t.level === level) &&
    (!q || [t.title, t.titleEn, t.summary].join(" ").toLowerCase().includes(q)),
  );

  return (
    <div className="grammar">
      <div className="page-header">
        <div>
          <div className="eyebrow">GRAMMAR</div>
          <h1>Ngữ pháp</h1>
          <p>Lộ trình {GRAMMAR_TOPICS.length} chủ điểm từ A1 đến C1. Mỗi bài có công thức, ví dụ Anh – Việt, lỗi hay gặp và bài tập có giải thích.</p>
        </div>
      </div>

      <section className="panel gr-summary">
        <SootBuddy size={60} look={{ hat: true, holdR: "star-yellow" }} mood={nextUp ? "curious" : "happy"} />
        <div className="gr-summary-copy">
          <span className="mini-label">TIẾN ĐỘ</span>
          <strong>{done}/{GRAMMAR_TOPICS.length} chủ điểm hoàn thành</strong>
          <div className="gr-track"><span style={{ width: `${percent}%` }} /></div>
          <small>Đạt từ {GRAMMAR_PASS_SCORE}% trở lên trong phần luyện tập để hoàn thành một chủ điểm.</small>
        </div>
        {nextUp && (
          <button className="button primary large" onClick={() => open(nextUp.id)}>
            <BookOpenCheck size={18} /> {records[nextUp.id] ? "Học tiếp" : done ? "Bài tiếp theo" : "Bắt đầu"}: {nextUp.title}
          </button>
        )}
      </section>

      <div className="gr-filters">
        <div className="gr-levels" role="tablist" aria-label="Cấp độ">
          <button role="tab" aria-selected={level === "all"} className={level === "all" ? "on" : ""} onClick={() => setLevel("all")}>Tất cả</button>
          {GRAMMAR_LEVELS.map((l) => (
            <button key={l.level} role="tab" aria-selected={level === l.level} className={level === l.level ? "on" : ""} onClick={() => setLevel(l.level)}>{l.level}</button>
          ))}
        </div>
        <label className="gr-search">
          <Search size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm chủ điểm: hiện tại hoàn thành, passive…" />
          {query && <button onClick={() => setQuery("")} aria-label="Xoá tìm kiếm"><X size={15} /></button>}
        </label>
      </div>

      {GRAMMAR_LEVELS.map((l) => {
        const topics = visible.filter((t) => t.level === l.level);
        if (!topics.length) return null;
        const all = GRAMMAR_TOPICS.filter((t) => t.level === l.level);
        const levelDone = all.filter((t) => records[t.id]?.completed_at).length;
        return (
          <section className="gr-level" key={l.level}>
            <div className="gr-level-head">
              <span className={`gr-badge lv-${l.level}`}>{l.level}</span>
              <div><h2>{l.name}</h2><p>{l.blurb}</p></div>
              <b>{levelDone}/{all.length}</b>
            </div>
            <div className="gr-topic-grid">
              {topics.map((t) => {
                const status = statusOf(records[t.id]);
                return (
                  <button key={t.id} className={`gr-topic ${status.tone}`} onClick={() => open(t.id)}>
                    <span className="gr-topic-num">{status.tone === "done" ? <Check size={16} /> : GRAMMAR_TOPICS.indexOf(t) + 1}</span>
                    <span className="gr-topic-copy">
                      <strong>{t.title}</strong>
                      <em>{t.titleEn}</em>
                      <small>{t.summary}</small>
                    </span>
                    <span className={`gr-status ${status.tone}`}>{status.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}

      {!visible.length && (
        <div className="empty-table"><SootBuddy size={64} mood="curious" tool="magnifier" look={{ bloom: "yellow" }} /><strong>Không tìm thấy chủ điểm</strong><span>Thử từ khoá khác hoặc chọn “Tất cả”.</span></div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- Lesson

function TopicLesson({ topic, number, record, onBack, onPractice, prevTopic, nextTopic, openTopic }: {
  topic: GrammarTopic; number: number; record?: GrammarRecord; onBack: () => void; onPractice: () => void;
  prevTopic: GrammarTopic | null; nextTopic: GrammarTopic | null; openTopic: (id: string) => void;
}) {
  const status = statusOf(record);
  return (
    <article className="grammar gr-lesson">
      <button className="text-button gr-back" onClick={onBack}><ArrowLeft size={15} /> Tất cả chủ điểm</button>

      <header className="gr-lesson-head">
        <div className="gr-lesson-meta"><span className={`gr-badge lv-${topic.level}`}>{topic.level}</span><span>Bài {number}/{GRAMMAR_TOPICS.length}</span><span className={`gr-status ${status.tone}`}>{status.label}</span></div>
        <h1>{topic.title}</h1>
        <p className="gr-lesson-en">{topic.titleEn}</p>
        <p className="gr-lesson-summary">{topic.summary}</p>
        <button className="button primary" onClick={onPractice}><PenLine size={16} /> Làm bài tập ({topic.exercises.length} câu)</button>
      </header>

      {topic.sections.map((section, i) => <LessonSection key={i} section={section} />)}

      {topic.mistakes.length > 0 && (
        <section className="panel gr-section">
          <h2><CircleAlert size={18} /> Lỗi hay gặp</h2>
          <div className="gr-mistakes">
            {topic.mistakes.map((m, i) => (
              <div className="gr-mistake" key={i}>
                <div className="gr-wrong"><X size={15} /> <span>{m.wrong}</span></div>
                <div className="gr-right"><Check size={15} /> <span>{m.right}</span></div>
                <p>{m.why}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="panel gr-cta">
        <SootBuddy size={58} look={{ bloom: "pink", holdR: "star-yellow" }} mood="curious" tool="magnifier" />
        <div>
          <strong>Kiểm tra xem bạn đã nắm chắc chưa</strong>
          <p>{topic.exercises.length} câu có giải thích. Đạt {GRAMMAR_PASS_SCORE}% để hoàn thành chủ điểm{record ? ` · lần trước ${record.last_score}%` : ""}.</p>
        </div>
        <button className="button primary large" onClick={onPractice}><PenLine size={17} /> Luyện tập ngay</button>
      </section>

      <SentenceCheck topic={topic} />

      <nav className="gr-pager" aria-label="Chuyển bài">
        {prevTopic ? <button className="button secondary" onClick={() => openTopic(prevTopic.id)}><ArrowLeft size={15} /> {prevTopic.title}</button> : <span />}
        {nextTopic && <button className="button secondary" onClick={() => openTopic(nextTopic.id)}>{nextTopic.title} <ArrowRight size={15} /></button>}
      </nav>
    </article>
  );
}

function LessonSection({ section }: { section: GrammarSection }) {
  return (
    <section className="panel gr-section">
      <h2>{section.heading}</h2>
      {section.text?.split("\n").filter(Boolean).map((p, i) => <p key={i} className="gr-text">{p}</p>)}
      {section.formulas && section.formulas.length > 0 && (
        <div className="gr-formulas">
          {section.formulas.map((f, i) => <div className="gr-formula" key={i}><span>{f.label}</span><code>{f.pattern}</code></div>)}
        </div>
      )}
      {section.points && section.points.length > 0 && <ul className="gr-points">{section.points.map((p, i) => <li key={i}>{p}</li>)}</ul>}
      {section.examples && section.examples.length > 0 && (
        <div className="gr-examples">
          {section.examples.map((ex, i) => (
            <div className="gr-example" key={i}>
              <button className="sound-mini" onClick={() => speakEnglish(ex.en)} aria-label={`Nghe: ${ex.en}`}><Volume2 size={15} /></button>
              <div>
                <strong>{ex.en}</strong>
                <span>{ex.vi}</span>
                {ex.note && <small>{ex.note}</small>}
              </div>
            </div>
          ))}
        </div>
      )}
      {section.table && (
        <div className="gr-table-wrap">
          <table className="gr-table">
            <thead><tr>{section.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>{section.table.rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------- AI sentence check

type CheckResult = { correct: boolean; uses_structure: boolean; corrected: string; feedback: string; better: string };

async function askGrammarApi<T>(body: object): Promise<T> {
  const res = await fetch("/api/grammar/practice", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Không thể kết nối AI lúc này.");
  return data as T;
}

function SentenceCheck({ topic }: { topic: GrammarTopic }) {
  const [sentence, setSentence] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  async function check() {
    if (!sentence.trim() || busy) return;
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const { check } = await askGrammarApi<{ check: CheckResult }>({ mode: "check", topicId: topic.id, sentence });
      setResult(check);
      playSound(check.correct && check.uses_structure ? "correct" : "pop");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể kết nối AI lúc này.");
    } finally {
      setBusy(false);
    }
  }

  const good = result?.correct && result.uses_structure;
  return (
    <section className="panel gr-section gr-write">
      <h2><Wand2 size={18} /> Tự đặt câu – AI chấm</h2>
      <p className="gr-text">Viết một câu của riêng bạn dùng cấu trúc “{topic.title}”. AI sẽ sửa lỗi và giải thích bằng tiếng Việt.</p>
      <textarea
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) void check(); }}
        maxLength={300}
        rows={2}
        placeholder="Ví dụ: I have lived here since 2020."
      />
      <div className="gr-write-actions">
        <small>Ctrl + Enter để gửi</small>
        <button className="button primary" disabled={!sentence.trim() || busy} onClick={() => void check()}>{busy ? <Loader2 className="spin" size={16} /> : <Sparkles size={16} />} AI chấm câu</button>
      </div>
      {error && <p className="gr-error">{error}</p>}
      {result && (
        <div className={`gr-check ${good ? "good" : "bad"}`}>
          <strong>{good ? "Chính xác! 🎉" : result.correct ? "Câu đúng, nhưng chưa dùng cấu trúc của bài" : "Cần sửa một chút"}</strong>
          {!result.correct && <p><span>Câu đúng:</span> {result.corrected}</p>}
          <p>{result.feedback}</p>
          {result.better && <p><span>Gợi ý hay hơn:</span> {result.better}</p>}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------- Practice

type Item = { ex: GrammarExercise; order: number[] };
type Miss = { ex: GrammarExercise; given: string };

function shuffle<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Options are shown in a random order so the answer can't be learnt by position.
const toItems = (list: GrammarExercise[]): Item[] =>
  list.map((ex) => ({ ex, order: ex.kind === "choice" ? shuffle(ex.options.map((_, i) => i)) : [] }));

const correctText = (ex: GrammarExercise) => (ex.kind === "choice" ? ex.options[ex.answer] : ex.answers[0]);

function Practice({ topic, record, onActivity, onFinish, onExit, nextTopic, openTopic }: {
  topic: GrammarTopic; record?: GrammarRecord; onActivity: Props["onActivity"]; onFinish: (score: number) => void;
  onExit: () => void; nextTopic: GrammarTopic | null; openTopic: (id: string) => void;
}) {
  const [items, setItems] = useState<Item[]>(() => toItems(topic.exercises));
  const [aiRound, setAiRound] = useState(false);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [right, setRight] = useState(false);
  const [misses, setMisses] = useState<Miss[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState("");
  const seen = useRef<string[]>(topic.exercises.map((e) => e.question));
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const item = items[index];
  const ex = item?.ex;

  useEffect(() => {
    if (!checked && ex?.kind === "fill") inputRef.current?.focus();
    if (checked) nextRef.current?.focus();
  }, [checked, ex, index]);

  function grade(ok: boolean, given: string) {
    setChecked(true);
    setRight(ok);
    playSound(ok ? "correct" : "wrong");
    if (ok) setScore((s) => s + 1);
    else setMisses((m) => [...m, { ex: ex!, given }]);
    void onActivity(ok ? (ex!.kind === "fill" ? 8 : 6) : 1, ok);
  }

  function pick(shownIndex: number) {
    if (checked || ex?.kind !== "choice") return;
    const original = item.order[shownIndex];
    setPicked(original);
    grade(original === ex.answer, ex.options[original]);
  }

  function submitFill() {
    if (checked || ex?.kind !== "fill" || !typed.trim()) return;
    grade(isFillCorrect(typed, ex.answers), typed.trim());
  }

  function next() {
    if (index + 1 < items.length) {
      setIndex(index + 1);
      setPicked(null);
      setTyped("");
      setChecked(false);
      return;
    }
    setFinished(true);
    const final = Math.round(score / items.length * 100);
    if (!aiRound) onFinish(final);
    playSound(final >= GRAMMAR_PASS_SCORE ? "celebrate" : "pop");
  }

  function restart(list: GrammarExercise[], fromAi: boolean) {
    setItems(toItems(list));
    setAiRound(fromAi);
    setIndex(0);
    setPicked(null);
    setTyped("");
    setChecked(false);
    setMisses([]);
    setScore(0);
    setFinished(false);
  }

  async function moreFromAi() {
    setAiBusy(true);
    setAiError("");
    try {
      const { exercises } = await askGrammarApi<{ exercises: GrammarExercise[] }>({ mode: "exercises", topicId: topic.id, avoid: seen.current.slice(-40) });
      seen.current.push(...exercises.map((e) => e.question));
      restart(exercises, true);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Không thể kết nối AI lúc này.");
    } finally {
      setAiBusy(false);
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Escape") { onExit(); return; }
      if (checked && e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) { e.preventDefault(); next(); return; }
      if (!checked && ex?.kind === "choice" && /^[1-4]$/.test(e.key)) {
        const n = Number(e.key) - 1;
        if (n < ex.options.length) pick(n);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (finished) {
    const final = Math.round(score / items.length * 100);
    const passed = final >= GRAMMAR_PASS_SCORE;
    return (
      <div className="grammar gr-practice">
        <button className="text-button gr-back" onClick={onExit}><ArrowLeft size={15} /> Về bài học</button>
        <section className="panel gr-result">
          <SootBuddy size={84} mood={passed ? "happy" : "curious"} look={passed ? { hat: true, holdR: "star-yellow" } : { bloom: "pink" }} />
          <span className="mini-label">{aiRound ? "VÒNG AI" : topic.title.toUpperCase()}</span>
          <h2>{final}% · {score}/{items.length} câu đúng</h2>
          <p>{passed
            ? aiRound ? "Làm tốt lắm! Bạn đã nắm chắc chủ điểm này." : "Tuyệt vời! Chủ điểm này đã được đánh dấu hoàn thành."
            : `Cần đạt ${GRAMMAR_PASS_SCORE}% để hoàn thành. Xem lại các câu sai bên dưới rồi thử lại nhé.`}
            {!aiRound && record && ` Điểm cao nhất: ${Math.max(record.best_score, final)}%.`}
          </p>
          <div className="gr-result-actions">
            <button className="button secondary" onClick={() => restart(topic.exercises, false)}><RotateCcw size={16} /> Làm lại bộ câu gốc</button>
            <button className="button secondary" disabled={aiBusy} onClick={() => void moreFromAi()}>{aiBusy ? <Loader2 className="spin" size={16} /> : <Sparkles size={16} />} AI tạo thêm 6 câu</button>
            {nextTopic && <button className="button primary" onClick={() => openTopic(nextTopic.id)}>Bài tiếp: {nextTopic.title} <ArrowRight size={16} /></button>}
          </div>
          {aiError && <p className="gr-error">{aiError}</p>}
        </section>

        {misses.length > 0 && (
          <section className="panel gr-section">
            <h2><CircleAlert size={18} /> Xem lại câu sai</h2>
            <div className="gr-review">
              {misses.map((m, i) => (
                <div className="gr-review-item" key={i}>
                  <QuestionText question={m.ex.question} fill={correctText(m.ex)} />
                  <p className="gr-review-given">Bạn trả lời: <s>{m.given}</s> → Đáp án: <b>{correctText(m.ex)}</b></p>
                  <p>{m.ex.explain}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  if (!ex) return null;
  const answerText = correctText(ex);

  return (
    <div className="grammar gr-practice">
      <div className="gr-practice-head">
        <button className="icon-btn" onClick={onExit} aria-label="Thoát luyện tập"><X size={18} /></button>
        <div className="gr-track"><span style={{ width: `${(index + (checked ? 1 : 0)) / items.length * 100}%` }} /></div>
        <span className="gr-practice-count"><Trophy size={14} /> {score}/{items.length}</span>
      </div>

      <section className="panel gr-question">
        <span className="mini-label">{aiRound ? "AI · " : ""}{topic.title} · Câu {index + 1}/{items.length}</span>
        <h2>
          <QuestionText question={ex.question} fill={checked ? answerText : ex.kind === "fill" ? typed : picked !== null ? ex.options[picked] : ""} />
          {ex.kind === "fill" && ex.hint && <em className="gr-hint"> ({ex.hint})</em>}
        </h2>
        {aiRound && <small className="gr-ai-note">Câu hỏi do AI tạo, hiếm khi có thể sai. Nếu thấy vô lý, hãy bỏ qua câu đó.</small>}

        {ex.kind === "choice" ? (
          <div className="gr-options">
            {item.order.map((original, shown) => {
              const state = !checked ? "" : original === ex.answer ? "right" : original === picked ? "wrong" : "dim";
              return (
                <button key={original} className={`lesson-option ${state}`} disabled={checked} onClick={() => pick(shown)}>
                  <kbd>{shown + 1}</kbd> {ex.options[original]}
                </button>
              );
            })}
          </div>
        ) : (
          <form className="gr-fill" onSubmit={(e) => { e.preventDefault(); submitFill(); }}>
            <input
              ref={inputRef}
              className={`lesson-input${checked ? (right ? " is-correct" : " is-wrong") : ""}`}
              value={typed}
              disabled={checked}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Gõ đáp án vào chỗ trống…"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            {!checked && <button className="button primary" disabled={!typed.trim()}>Kiểm tra</button>}
          </form>
        )}

        {checked && (
          <div className={`gr-feedback ${right ? "good" : "bad"}`}>
            <strong>{right ? "Chính xác!" : <>Chưa đúng. Đáp án: <b>{answerText}</b></>}</strong>
            {!right && ex.kind === "fill" && ex.answers.length > 1 && <small>Cũng chấp nhận: {ex.answers.slice(1).join(" · ")}</small>}
            <p>{ex.explain}</p>
            <button ref={nextRef} className="button primary" onClick={next}>{index + 1 < items.length ? "Câu tiếp" : "Xem kết quả"} <ArrowRight size={16} /></button>
          </div>
        )}
      </section>
      <p className="gr-keys"><kbd>1</kbd>–<kbd>4</kbd> chọn đáp án · <kbd>Enter</kbd> kiểm tra / câu tiếp · <kbd>Esc</kbd> thoát</p>
    </div>
  );
}

// Shows a sentence with its "___" gap highlighted, filled with `fill` when given.
function QuestionText({ question, fill }: { question: string; fill: string }) {
  const parts = useMemo(() => question.split("___"), [question]);
  return (
    <span className="gr-q">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className={`gr-gap${fill ? " filled" : ""}`}>{fill || "      "}</span>}
        </Fragment>
      ))}
    </span>
  );
}
