"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, Check, Flame, Gamepad2, Headphones, Keyboard, LayoutGrid,
  RotateCcw, Sparkles, Timer, Trophy, Volume2, X, Zap
} from "lucide-react";
import type { UserProgress, Vocabulary } from "@/lib/types";
import { DAILY_GOAL as DEFAULT_GOAL, effectiveDailyAnswers, effectiveStreak, gameAccuracy, levelInfo } from "@/lib/gamification";
import { speakEnglish, speakEnglishAndWait } from "@/lib/speech";
import { playSound } from "@/lib/sound";
import { PeekCrew, SootBuddy, type CrewMember, type SignTone, type SootMood } from "./Soot";

const GAME_CREW: CrewMember[] = [
  { x: 9, size: 70, look: { bloom: "green", holdR: "star-pink" } },
  { x: 25, size: 88, look: { hat: true }, bubble: true },
  { x: 75, size: 96, look: { bloom: "pink", holdL: "star-yellow", holdR: "flower-yellow" }, bubble: true },
  { x: 91, size: 68, look: { bloom: "yellow" } },
];

const LOBBY_CREW: CrewMember[] = [
  { x: 64, size: 72, look: { bloom: "yellow", holdR: "star-pink" } },
  { x: 78, size: 98, look: { hat: true, holdL: "star-yellow" } },
  { x: 92, size: 70, look: { bloom: "pink" } },
];

const CHEERS = ["Đúng rồi!", "Giỏi quá!", "Chuẩn!", "Tuyệt!", "Great!"];

type Reaction = { mood: SootMood; signs: (string | undefined)[]; tone: SignTone };

type GameId = "quiz" | "typing" | "listening" | "match" | "speed";
type AwardFn = (xp: number, correct: boolean) => void | Promise<void>;

const games: Array<{ id: GameId; title: string; subtitle: string; icon: React.ElementType; xp: string; min: number }> = [
  { id: "quiz", title: "Quick Quiz", subtitle: "Choose the correct meaning", icon: Gamepad2, xp: "+10 XP", min: 4 },
  { id: "typing", title: "Type It", subtitle: "Recall the English word", icon: Keyboard, xp: "+15 XP", min: 1 },
  { id: "listening", title: "Listen & Type", subtitle: "Hear it, then spell it", icon: Headphones, xp: "+15 XP", min: 1 },
  { id: "match", title: "Match Pairs", subtitle: "Connect words and meanings", icon: LayoutGrid, xp: "+8 XP", min: 4 },
  { id: "speed", title: "Speed Round", subtitle: "30 seconds. Go fast!", icon: Timer, xp: "+12 XP", min: 4 },
];

function shuffle<T>(input: T[]) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sample<T>(items: T[], count: number) {
  return shuffle(items).slice(0, Math.min(count, items.length));
}


function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ");
}

export default function GamesView({ words, progress, onActivity, dailyGoal = DEFAULT_GOAL }: {
  dailyGoal?: number;
  words: Vocabulary[];
  progress: UserProgress;
  onActivity: (xp: number, correct: boolean, isGame?: boolean) => void | Promise<void>;
}) {
  const [active, setActive] = useState<GameId | null>(null);
  const [sessionXp, setSessionXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [cheer, setCheer] = useState(0);
  const reactionTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(reactionTimer.current), []);

  // The crew above the game board cheers for right answers and holds up signs for wrong ones.
  function react(correct: boolean, nextCombo: number) {
    playSound(!correct ? "wrong" : nextCombo >= 3 ? "combo" : "correct");
    const praise = CHEERS[Math.floor(Math.random() * CHEERS.length)];
    setReaction(correct
      ? { mood: "happy", signs: [undefined, nextCombo >= 3 ? `Combo x${nextCombo}!` : undefined, praise, undefined], tone: "good" }
      : { mood: "error", signs: ["Oops!", undefined, "Sai rồi!", "✕"], tone: "bad" });
    if (correct) setCheer((v) => v + 1);
    window.clearTimeout(reactionTimer.current);
    reactionTimer.current = window.setTimeout(() => setReaction(null), 1400);
  }
  const level = levelInfo(progress.total_xp);
  const daily = effectiveDailyAnswers(progress);
  const streak = effectiveStreak(progress);

  const award: AwardFn = async (xp, correct) => {
    const actualXp = correct ? xp + Math.min(10, combo * 2) : 1;
    setSessionXp((v) => v + actualXp);
    react(correct, correct ? combo + 1 : 0);
    if (correct) {
      setCombo((v) => {
        const next = v + 1;
        setBestCombo((best) => Math.max(best, next));
        return next;
      });
    } else {
      setCombo(0);
    }
    await onActivity(actualXp, correct, true);
  };

  function openGame(id: GameId) {
    setSessionXp(0);
    setCombo(0);
    setBestCombo(0);
    setActive(id);
  }

  if (active) {
    const selected = games.find((g) => g.id === active)!;
    return (
      <div className="games-page">
        <div className="game-session-head">
          <button className="button secondary" onClick={() => setActive(null)}><ArrowLeft size={16} /> Games</button>
          <div className="game-session-title"><selected.icon size={20} /><div><strong>{selected.title}</strong><span>{selected.subtitle}</span></div></div>
          <div className="session-metrics"><span><Zap size={15} /> {sessionXp} XP</span><span className={combo > 1 ? "hot" : ""}><Flame size={15} /> x{combo}</span></div>
        </div>
        <PeekCrew
          className="game-peek"
          members={GAME_CREW}
          mood={reaction?.mood ?? "curious"}
          signs={reaction?.signs}
          signTone={reaction?.tone}
          bubble={reaction?.mood === "happy" ? "♪" : "?"}
          cheer={cheer}
          ledge={84}
        >
          <div>
            {active === "quiz" && <QuizGame words={words} award={award} />}
            {active === "typing" && <TypingGame words={words} award={award} listening={false} />}
            {active === "listening" && <TypingGame words={words} award={award} listening />}
            {active === "match" && <MatchGame words={words} award={award} />}
            {active === "speed" && <SpeedGame words={words} award={award} />}
          </div>
        </PeekCrew>
        <div className="session-footer-note">Best combo this session: <strong>🔥 x{bestCombo}</strong></div>
      </div>
    );
  }

  return (
    <div className="games-page">
      <div className="page-header">
        <div><div className="eyebrow"><Sparkles size={14} /> PLAY & REMEMBER</div><h1>Vocabulary Games</h1><p>Turn recall practice into short, focused challenges. Every answer contributes to your streak and XP.</p></div>
      </div>

      <PeekCrew members={LOBBY_CREW} signs={[undefined, "Let's play!"]} signTone="good" ledge={86}>
      <div className="game-progress-strip">
        <div><span className="game-progress-icon violet"><Trophy size={19} /></span><div><small>LEVEL</small><strong>{level.level}</strong><em>{progress.total_xp.toLocaleString()} XP total</em></div></div>
        <div><span className="game-progress-icon orange"><Flame size={19} /></span><div><small>STREAK</small><strong>{streak} days</strong><em>Best: {progress.best_streak}</em></div></div>
        <div><span className="game-progress-icon teal"><Zap size={19} /></span><div><small>DAILY</small><strong>{Math.min(daily, dailyGoal)}/{dailyGoal}</strong><em>{Math.min(100, Math.round(daily / dailyGoal * 100))}% complete</em></div></div>
        <div><span className="game-progress-icon blue"><Check size={19} /></span><div><small>GAME ACCURACY</small><strong>{gameAccuracy(progress)}%</strong><em>{progress.game_answers} answers</em></div></div>
      </div>
      </PeekCrew>

      <div className="level-track"><span style={{ width: `${level.percent}%` }} /><small>{level.currentXp} / {level.neededXp} XP to next level</small></div>

      <div className="games-grid">
        {games.map((game) => {
          const Icon = game.icon;
          const disabled = words.length < game.min;
          return <button key={game.id} className="game-card" disabled={disabled} onClick={() => openGame(game.id)}>
            <div className={`game-card-icon game-${game.id}`}><Icon size={26} /></div>
            <div className="game-card-copy"><h3>{game.title}</h3><p>{game.subtitle}</p></div>
            <div className="game-card-footer"><span>{disabled ? `Need ${game.min} words` : game.xp}</span><b>{disabled ? "Add words" : "Play →"}</b></div>
          </button>;
        })}
      </div>

      {words.length < 4 && <div className="game-empty-note"><Gamepad2 size={20} /><div><strong>Add at least 4 vocabulary words to unlock every game.</strong><span>Typing and listening can already be played with one word.</span></div></div>}
    </div>
  );
}

function QuizGame({ words, award }: { words: Vocabulary[]; award: AwardFn }) {
  const [seed, setSeed] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const round = useMemo(() => {
    const target = sample(words, 1)[0];
    if (!target) return null;
    const distractors = sample(words.filter((w) => w.id !== target.id && w.meaning !== target.meaning), 3);
    return { target, options: shuffle([target, ...distractors]) };
  }, [words, seed]);

  if (!round) return <GameEmpty />;
  const answered = picked !== null;
  return <div className="game-stage">
    <div className="game-prompt"><span>Choose the meaning</span><div className="prompt-word-with-audio"><h2>{round.target.word}</h2><button className="word-audio-btn" type="button" onClick={() => speakEnglish(round.target.word)} aria-label={`Listen to ${round.target.word}`} title="Listen"><Volume2 size={19} /></button></div><p>{round.target.pronunciation || round.target.part_of_speech || "What does this word mean?"}</p></div>
    <div className="quiz-options">{round.options.map((option) => {
      const correct = option.id === round.target.id;
      const state = answered ? correct ? "correct" : picked === option.id ? "wrong" : "" : "";
      return <button key={option.id} disabled={answered} className={state} onClick={() => { setPicked(option.id); speakEnglish(round.target.word); void award(10, correct); }}><span>{option.meaning}</span>{answered && correct && <Check size={18} />}{answered && picked === option.id && !correct && <X size={18} />}</button>;
    })}</div>
    {answered && <div className="answered-word-audio"><span>{round.target.word}</span><button type="button" onClick={() => speakEnglish(round.target.word)} aria-label={`Listen to ${round.target.word}`}><Volume2 size={17} /> Listen again</button></div>}
    {answered && <button className="button primary game-next" onClick={() => { setPicked(null); setSeed((v) => v + 1); }}>Next word →</button>}
  </div>;
}

function TypingGame({ words, award, listening }: { words: Vocabulary[]; award: AwardFn; listening: boolean }) {
  const [seed, setSeed] = useState(0);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const target = useMemo(() => sample(words, 1)[0], [words, seed]);

  useEffect(() => {
    if (listening && target) {
      const id = window.setTimeout(() => speakEnglish(target.word), 250);
      return () => window.clearTimeout(id);
    }
  }, [listening, target]);

  if (!target) return <GameEmpty />;
  function submit() {
    if (!value.trim() || result) return;
    const correct = normalize(value) === normalize(target.word);
    setResult(correct ? "correct" : "wrong");
    speakEnglish(target.word);
    void award(15, correct);
  }
  return <div className="game-stage typing-stage">
    <div className="game-prompt">
      <span>{listening ? "Listen carefully" : "Type the English word"}</span>
      {listening ? <button className="listen-orb" onClick={() => speakEnglish(target.word)}><Volume2 size={34} /></button> : <><h2 className="meaning-prompt">{target.meaning}</h2><p>{target.part_of_speech || "Recall the word from memory"}</p></>}
    </div>
    <div className={`typing-answer ${result ?? ""}`}><input autoFocus value={value} disabled={!!result} placeholder={listening ? "Type what you hear..." : "Type the English word..."} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} /><button onClick={submit} disabled={!value.trim() || !!result}>Check</button></div>
    {result && <div className={`answer-feedback ${result}`}><div><strong>{result === "correct" ? `Nice! ${target.word}` : `Answer: ${target.word}`}</strong><span>{target.meaning}</span></div><button className="feedback-audio-btn" type="button" onClick={() => speakEnglish(target.word)} aria-label={`Listen to ${target.word}`} title="Listen again"><Volume2 size={17} /></button></div>}
    {result && <button className="button primary game-next" onClick={() => { setValue(""); setResult(null); setSeed((v) => v + 1); }}>Next →</button>}
  </div>;
}

function MatchGame({ words, award }: { words: Vocabulary[]; award: AwardFn }) {
  const [seed, setSeed] = useState(0);
  const pairs = useMemo(() => sample(words, 4), [words, seed]);
  const meanings = useMemo(() => shuffle(pairs), [pairs]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);

  useEffect(() => { setSelectedWord(null); setMatched([]); setWrong(null); }, [seed]);
  if (pairs.length < 4) return <GameEmpty text="Add at least 4 words to play Match Pairs." />;
  const done = matched.length === pairs.length;
  function chooseMeaning(id: string) {
    if (!selectedWord || matched.includes(id)) return;
    const selectedVocabulary = pairs.find((word) => word.id === selectedWord);
    if (selectedVocabulary) speakEnglish(selectedVocabulary.word);
    const correct = selectedWord === id;
    void award(8, correct);
    if (correct) {
      if (matched.length + 1 === pairs.length) window.setTimeout(() => playSound("celebrate"), 350);
      setMatched((v) => [...v, id]);
      setSelectedWord(null);
      setWrong(null);
    } else {
      setWrong(id);
      window.setTimeout(() => setWrong(null), 500);
    }
  }
  return <div className="game-stage">
    <div className="game-prompt compact"><span>Match all four pairs</span><h2>{matched.length} / {pairs.length}</h2><p>Select a word, then its meaning.</p></div>
    <div className="match-board">
      <div>{pairs.map((word) => <div key={word.id} className={`match-word-row ${matched.includes(word.id) ? "matched" : ""}`}><button disabled={matched.includes(word.id)} className={`${selectedWord === word.id ? "selected" : ""} ${matched.includes(word.id) ? "matched" : ""}`} onClick={() => setSelectedWord(word.id)}>{word.word}</button><button type="button" className="match-audio-btn" onClick={() => speakEnglish(word.word)} aria-label={`Listen to ${word.word}`} title="Listen"><Volume2 size={15} /></button></div>)}</div>
      <div>{meanings.map((word) => <button key={word.id} disabled={matched.includes(word.id)} className={`${matched.includes(word.id) ? "matched" : ""} ${wrong === word.id ? "wrong" : ""}`} onClick={() => chooseMeaning(word.id)}>{word.meaning}</button>)}</div>
    </div>
    {done && <div className="game-complete"><Trophy size={30} /><strong>Board cleared!</strong><span>Great recall. Shuffle and try another set.</span><button className="button primary" onClick={() => setSeed((v) => v + 1)}><RotateCcw size={16} /> New board</button></div>}
  </div>;
}

function SpeedGame({ words, award }: { words: Vocabulary[]; award: AwardFn }) {
  const [seconds, setSeconds] = useState(30);
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [running, setRunning] = useState(true);
  const round = useMemo(() => {
    const target = sample(words, 1)[0];
    if (!target) return null;
    const distractors = sample(words.filter((w) => w.id !== target.id && w.meaning !== target.meaning), 2);
    return { target, options: shuffle([target, ...distractors]) };
  }, [words, seed]);

  // The clock pauses while the picked word is being read aloud.
  useEffect(() => {
    if (!running || picked) return;
    if (seconds <= 0) { setRunning(false); playSound("celebrate"); return; }
    const id = window.setTimeout(() => setSeconds((v) => v - 1), 1000);
    return () => window.clearTimeout(id);
  }, [seconds, running, picked]);

  if (!round) return <GameEmpty />;
  if (!running) return <div className="game-stage"><div className="speed-finish"><Timer size={42} /><span>Time!</span><h2>{score}</h2><p>correct answers in 30 seconds</p><button className="button primary" onClick={() => { setSeconds(30); setScore(0); setPicked(null); setSeed((v) => v + 1); setRunning(true); }}><RotateCcw size={16} /> Play again</button></div></div>;

  return <div className="game-stage speed-stage">
    <div className="speed-bar"><strong><Timer size={18} /> {seconds}s</strong><span>{score} correct</span></div>
    <div className="game-prompt"><span>Pick fast</span><div className="prompt-word-with-audio"><h2>{round.target.word}</h2><button className="word-audio-btn" type="button" onClick={() => speakEnglish(round.target.word)} aria-label={`Listen to ${round.target.word}`} title="Listen"><Volume2 size={19} /></button></div><p>Choose the meaning before time runs out.</p></div>
    <div className="quiz-options compact">{round.options.map((option) => {
      const correct = option.id === round.target.id;
      return <button key={option.id} disabled={picked !== null} className={picked ? correct ? "correct" : picked === option.id ? "wrong" : "" : ""} onClick={() => {
        setPicked(option.id);
        void award(12, correct);
        if (correct) setScore((v) => v + 1);
        // Finish reading the word before moving on, but keep the answer visible at least briefly.
        const started = Date.now();
        void speakEnglishAndWait(round.target.word).then(() => {
          window.setTimeout(() => { setPicked(null); setSeed((v) => v + 1); }, Math.max(150, 500 - (Date.now() - started)));
        });
      }}>{option.meaning}</button>;
    })}</div>
  </div>;
}

function GameEmpty({ text = "Add some vocabulary first to play this game." }: { text?: string }) {
  return <div className="game-stage game-empty"><SootBuddy size={70} mood="curious" tool="magnifier" look={{ hat: true }} /><strong>Not enough vocabulary yet</strong><span>{text}</span></div>;
}

export function AchievementsView({ words, progress }: { words: Vocabulary[]; progress: UserProgress }) {
  const mastered = words.filter((w) => w.mastery_level >= 5).length;
  const streak = effectiveStreak(progress);
  const accuracy = gameAccuracy(progress);
  const achievements = [
    { icon: "🌱", title: "First Steps", detail: "Save 10 vocabulary words", current: words.length, goal: 10 },
    { icon: "📚", title: "Word Collector", detail: "Save 100 vocabulary words", current: words.length, goal: 100 },
    { icon: "🔥", title: "On Fire", detail: "Reach a 7-day streak", current: streak, goal: 7 },
    { icon: "🎮", title: "Game On", detail: "Answer 50 game questions", current: progress.game_answers, goal: 50 },
    { icon: "🧠", title: "Memory Master", detail: "Master 50 words", current: mastered, goal: 50 },
    { icon: "⚡", title: "XP Hunter", detail: "Earn 1,000 XP", current: progress.total_xp, goal: 1000 },
    { icon: "🎯", title: "Sharp Mind", detail: "90% game accuracy after 20 answers", current: progress.game_answers >= 20 ? accuracy : 0, goal: 90 },
  ];
  const unlocked = achievements.filter((a) => a.current >= a.goal).length;
  return <>
    <div className="page-header"><div><div className="eyebrow"><Trophy size={14} /> MILESTONES</div><h1>Achievements</h1><p>Small milestones make long-term learning visible. Keep collecting them as you study.</p></div><div className="achievement-summary"><strong>{unlocked}/{achievements.length}</strong><span>unlocked</span></div></div>
    <div className="achievement-grid">{achievements.map((item) => {
      const done = item.current >= item.goal;
      const pct = Math.min(100, Math.round(item.current / item.goal * 100));
      return <article key={item.title} className={`achievement-card ${done ? "unlocked" : ""}`}><div className="achievement-medal">{item.icon}</div><div className="achievement-copy"><div><span>{done ? "UNLOCKED" : `${pct}%`}</span><h3>{item.title}</h3></div><p>{item.detail}</p><div className="achievement-progress"><span style={{ width: `${pct}%` }} /></div><small>{Math.min(item.current, item.goal)} / {item.goal}</small></div>{done && <Check className="achievement-check" size={18} />}</article>;
    })}</div>
  </>;
}
