"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen, Brain, ChartNoAxesCombined, Check, ChevronDown, Flame, FolderOpen, Heart,
  LayoutDashboard, Library, Loader2, Moon, MoreHorizontal, Pencil, Plus, Search, Sparkles,
  Sun, Trash2, Volume2, Wifi, WifiOff, X, Zap, LogOut, Gamepad2, Trophy, FileUp
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Deck, ReviewRating, UserProgress, ViewName, Vocabulary } from "@/lib/types";
import { getReviewUpdate, isDue, masteryLabel } from "@/lib/srs";
import { DAILY_GOAL, effectiveDailyAnswers, effectiveStreak, emptyProgress, getWeakWords, levelInfo, localDateKey } from "@/lib/gamification";
import WordModal, { type WordDraft } from "./WordModal";
import DeckModal, { type DeckDraft } from "./DeckModal";
import FlashcardStudy from "./FlashcardStudy";
import AuthScreen from "./AuthScreen";
import GamesView, { AchievementsView } from "./GamesView";
import ImportWordsModal from "./ImportWordsModal";

const navItems: { id: ViewName; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "words", label: "Vocabulary", icon: Library },
  { id: "flashcards", label: "Flashcards", icon: Brain },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "decks", label: "Decks", icon: FolderOpen },
  { id: "stats", label: "Progress", icon: ChartNoAxesCombined },
  { id: "achievements", label: "Achievements", icon: Trophy },
];

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function splitCsv(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function formatDate(value: string | null) {
  if (!value) return "New";
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

export default function VocabApp() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [view, setView] = useState<ViewName>("dashboard");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [words, setWords] = useState<Vocabulary[]>([]);
  const [progress, setProgress] = useState<UserProgress>(() => emptyProgress());
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [online, setOnline] = useState(true);
  const [query, setQuery] = useState("");
  const [deckFilter, setDeckFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [wordModalOpen, setWordModalOpen] = useState(false);
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Vocabulary | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toast, setToast] = useState("");
  const [recoveryMode, setRecoveryMode] = useState(false);
  const currentUserIdRef = useRef<string | null>(null);
  const draftRestoreCheckedRef = useRef<string | null>(null);

  const flashWords = useMemo(() => {
    const inDeck = deckFilter === "all" ? words : words.filter((w) => w.deck_id === deckFilter);
    const due = inDeck.filter(isDue);
    return due.length ? due : inDeck.filter((w) => w.mastery_level < 5);
  }, [words, deckFilter]);

  const filteredWords = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((word) => {
      const searchMatch = !q || [word.word, word.meaning, word.example, ...(word.tags ?? [])]
        .filter(Boolean).join(" ").toLowerCase().includes(q);
      const deckMatch = deckFilter === "all" || word.deck_id === deckFilter;
      const levelMatch = levelFilter === "all" || String(word.mastery_level) === levelFilter;
      return searchMatch && deckMatch && levelMatch;
    });
  }, [words, query, deckFilter, levelFilter]);

  const weakWords = useMemo(() => getWeakWords(words), [words]);

  const stats = useMemo(() => {
    const total = words.length;
    const mastered = words.filter((w) => w.mastery_level >= 5).length;
    const due = words.filter(isDue).length;
    const reviewed = words.reduce((sum, w) => sum + w.review_count, 0);
    const correct = words.reduce((sum, w) => sum + w.correct_count, 0);
    const wrong = words.reduce((sum, w) => sum + w.wrong_count, 0);
    const accuracy = correct + wrong ? Math.round((correct / (correct + wrong)) * 100) : 0;
    const mastery = total ? Math.round(words.reduce((sum, w) => sum + w.mastery_level, 0) / (total * 5) * 100) : 0;
    return { total, mastered, due, reviewed, accuracy, mastery };
  }, [words]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }, []);

  const loadData = useCallback(async (uid: string, quiet = false) => {
    if (!quiet) setLoading(true);
    else setSyncing(true);
    const [decksRes, wordsRes, progressRes] = await Promise.all([
      supabase.from("decks").select("*").eq("user_id", uid).order("created_at", { ascending: true }),
      supabase.from("vocabularies").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
      supabase.from("user_progress").select("*").eq("user_id", uid).maybeSingle(),
    ]);

    if (decksRes.error) showToast(decksRes.error.message);
    if (wordsRes.error) showToast(wordsRes.error.message);
    if (progressRes.error && !String(progressRes.error.message).includes("user_progress")) showToast(progressRes.error.message);

    let nextDecks = (decksRes.data ?? []) as Deck[];
    if (!decksRes.error && nextDecks.length === 0) {
      const { data } = await supabase.from("decks").insert({
        user_id: uid,
        name: "My Vocabulary",
        description: "Your first vocabulary collection",
        icon: "🌱",
        color: "#6d5dfc",
      }).select("*").single();
      if (data) nextDecks = [data as Deck];
    }

    setDecks(nextDecks);
    setWords((wordsRes.data ?? []) as Vocabulary[]);

    if (progressRes.data) {
      setProgress(progressRes.data as UserProgress);
    } else if (!progressRes.error) {
      const { data } = await supabase.from("user_progress").insert({ user_id: uid }).select("*").single();
      setProgress((data as UserProgress | null) ?? emptyProgress(uid));
    } else {
      setProgress(emptyProgress(uid));
    }
    setLoading(false);
    setSyncing(false);
  }, [showToast]);

  useEffect(() => {
    const saved = localStorage.getItem("lexibloom-theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;

    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setRecoveryMode(new URLSearchParams(window.location.search).get("recovery") === "1");

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      const nextUser = session?.user ?? null;
      currentUserIdRef.current = nextUser?.id ?? null;
      setUser(nextUser);
      setAuthReady(true);
      if (!nextUser) setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY") {
        setRecoveryMode(true);
      }

      const nextUser = session?.user ?? null;
      const nextUserId = nextUser?.id ?? null;

      // Supabase có thể phát SIGNED_IN hoặc TOKEN_REFRESHED khi tab được focus lại.
      // Nếu vẫn là cùng một user thì KHÔNG setUser lại, vì một User object mới
      // sẽ làm effect tải dữ liệu chạy lại và khiến giao diện trông như reload.
      if (nextUserId === currentUserIdRef.current) {
        setAuthReady(true);
        return;
      }

      currentUserIdRef.current = nextUserId;
      setUser(nextUser);
      setAuthReady(true);

      if (!nextUser) {
        setDecks([]);
        setWords([]);
        setProgress(emptyProgress());
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const restoreGuestBackup = useCallback(async (uid: string) => {
    const raw = localStorage.getItem("lexibloom-guest-backup");
    if (!raw) return 0;

    let backup: {
      decks?: Deck[];
      words?: Vocabulary[];
      reviews?: Array<{
        id: string;
        user_id: string;
        vocabulary_id: string;
        rating: number;
        previous_level: number | null;
        new_level: number | null;
        reviewed_at: string;
      }>;
    };

    try {
      backup = JSON.parse(raw);
    } catch {
      localStorage.removeItem("lexibloom-guest-backup");
      return 0;
    }

    const deckMap = new Map<string, string>();
    const wordMap = new Map<string, string>();

    for (const deck of backup.decks ?? []) {
      const { data, error } = await supabase.from("decks").insert({
        user_id: uid,
        name: deck.name,
        description: deck.description,
        icon: deck.icon,
        color: deck.color,
        created_at: deck.created_at,
        updated_at: deck.updated_at,
      }).select("id").single();

      if (error) throw new Error(`Không thể chuyển deck “${deck.name}”: ${error.message}`);
      deckMap.set(deck.id, data.id);
    }

    for (const word of backup.words ?? []) {
      const { data, error } = await supabase.from("vocabularies").insert({
        user_id: uid,
        deck_id: word.deck_id ? deckMap.get(word.deck_id) ?? null : null,
        word: word.word,
        meaning: word.meaning,
        pronunciation: word.pronunciation,
        part_of_speech: word.part_of_speech,
        example: word.example,
        example_translation: word.example_translation,
        note: word.note,
        synonyms: word.synonyms ?? [],
        antonyms: word.antonyms ?? [],
        tags: word.tags ?? [],
        image_url: word.image_url,
        favorite: word.favorite,
        mastery_level: word.mastery_level,
        review_count: word.review_count,
        correct_count: word.correct_count,
        wrong_count: word.wrong_count,
        last_reviewed_at: word.last_reviewed_at,
        next_review_at: word.next_review_at,
        created_at: word.created_at,
        updated_at: word.updated_at,
      }).select("id").single();

      if (error) throw new Error(`Không thể chuyển từ “${word.word}”: ${error.message}`);
      wordMap.set(word.id, data.id);
    }

    for (const review of backup.reviews ?? []) {
      const newVocabularyId = wordMap.get(review.vocabulary_id);
      if (!newVocabularyId) continue;

      const { error } = await supabase.from("review_history").insert({
        user_id: uid,
        vocabulary_id: newVocabularyId,
        rating: review.rating,
        previous_level: review.previous_level,
        new_level: review.new_level,
        reviewed_at: review.reviewed_at,
      });

      if (error) throw new Error(`Không thể chuyển lịch sử ôn tập: ${error.message}`);
    }

    localStorage.removeItem("lexibloom-guest-backup");
    localStorage.removeItem("lexibloom-auth-next-mode");
    localStorage.removeItem("lexibloom-auth-prefill-email");

    return (backup.words ?? []).length;
  }, []);

  useEffect(() => {
    const userId = user?.id;
    if (!userId || user?.is_anonymous) return;

    let cancelled = false;

    (async () => {
      try {
        const moved = await restoreGuestBackup(userId);
        if (!cancelled && moved > 0) showToast(`Đã chuyển ${moved} từ vựng guest vào tài khoản này`);
      } catch (error) {
        if (!cancelled) showToast(error instanceof Error ? error.message : "Không thể chuyển dữ liệu guest");
      }
      if (!cancelled) await loadData(userId);
    })();

    const channel = supabase
      .channel(`lexibloom-${userId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "decks", filter: `user_id=eq.${userId}` }, () => loadData(userId, true))
      .on("postgres_changes", { event: "*", schema: "public", table: "vocabularies", filter: `user_id=eq.${userId}` }, () => loadData(userId, true))
      .on("postgres_changes", { event: "*", schema: "public", table: "user_progress", filter: `user_id=eq.${userId}` }, () => loadData(userId, true))
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [user?.id, user?.is_anonymous, loadData, restoreGuestBackup, showToast]);

  // Nếu browser thật sự reload/discard tab, WordModal đã lưu draft trong localStorage.
  // Sau khi dữ liệu user tải xong, tự mở lại đúng form để người dùng tiếp tục gõ.
  useEffect(() => {
    const userId = user?.id;
    if (!userId || user?.is_anonymous || loading) return;
    if (draftRestoreCheckedRef.current === userId) return;

    draftRestoreCheckedRef.current = userId;
    const prefix = `lexibloom-word-draft:${userId}:`;

    try {
      const newDraftKey = `${prefix}new`;
      if (localStorage.getItem(newDraftKey)) {
        setEditingWord(null);
        setWordModalOpen(true);
        return;
      }

      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key?.startsWith(prefix)) continue;

        const wordId = key.slice(prefix.length);
        if (!wordId || wordId === "new") continue;

        const existingWord = words.find((word) => word.id === wordId);
        if (existingWord) {
          setEditingWord(existingWord);
          setWordModalOpen(true);
          return;
        }
      }
    } catch {
      // Nếu localStorage bị chặn thì bỏ qua, app vẫn hoạt động bình thường.
    }
  }, [user?.id, user?.is_anonymous, loading, words]);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("lexibloom-theme", next);
  }

  async function saveWord(draft: WordDraft) {
    if (!user) return;
    const payload = {
      user_id: user.id,
      deck_id: draft.deck_id || null,
      word: draft.word.trim(),
      meaning: draft.meaning.trim(),
      pronunciation: draft.pronunciation.trim() || null,
      part_of_speech: draft.part_of_speech || null,
      example: draft.example.trim() || null,
      example_translation: draft.example_translation.trim() || null,
      note: draft.note.trim() || null,
      tags: splitCsv(draft.tags),
      synonyms: splitCsv(draft.synonyms),
      antonyms: splitCsv(draft.antonyms),
      updated_at: new Date().toISOString(),
    };

    const { error } = editingWord
      ? await supabase.from("vocabularies").update(payload).eq("id", editingWord.id).eq("user_id", user.id)
      : await supabase.from("vocabularies").insert(payload);

    if (error) throw new Error(error.message);
    showToast(editingWord ? "Vocabulary updated" : "New word added");
    setEditingWord(null);
    await loadData(user.id, true);
  }

  async function createDeck(draft: DeckDraft) {
    if (!user) return;
    const { error } = await supabase.from("decks").insert({
      user_id: user.id,
      name: draft.name.trim(),
      description: draft.description.trim() || null,
      icon: draft.icon || "📚",
      color: draft.color || "#6d5dfc",
    });
    if (error) throw new Error(error.message);
    showToast("Deck created");
    await loadData(user.id, true);
  }

  async function deleteWord(word: Vocabulary) {
    if (!user || !window.confirm(`Delete “${word.word}”?`)) return;
    const { error } = await supabase.from("vocabularies").delete().eq("id", word.id).eq("user_id", user.id);
    if (error) showToast(error.message);
    else {
      setWords((prev) => prev.filter((w) => w.id !== word.id));
      showToast("Word deleted");
    }
  }

  async function deleteDeck(deck: Deck) {
    if (!user || !window.confirm(`Delete deck “${deck.name}”? Words will stay, but move to “No deck”.`)) return;
    const { error } = await supabase.from("decks").delete().eq("id", deck.id).eq("user_id", user.id);
    if (error) showToast(error.message);
    else {
      if (deckFilter === deck.id) setDeckFilter("all");
      showToast("Deck deleted");
      await loadData(user.id, true);
    }
  }

  async function toggleFavorite(word: Vocabulary) {
    if (!user) return;
    setWords((prev) => prev.map((w) => w.id === word.id ? { ...w, favorite: !w.favorite } : w));
    const { error } = await supabase.from("vocabularies").update({ favorite: !word.favorite, updated_at: new Date().toISOString() }).eq("id", word.id).eq("user_id", user.id);
    if (error) {
      showToast(error.message);
      await loadData(user.id, true);
    }
  }

  async function recordActivity(xp: number, correct: boolean, isGame = false) {
    if (!user) return;

    const { data, error } = await supabase.rpc("record_learning_activity", {
      p_xp: Math.max(0, Math.round(xp)),
      p_correct: correct,
      p_is_game: isGame,
      p_local_date: localDateKey(),
    });

    if (error) {
      // Games still work if the migration has not been run yet; only persistence is skipped.
      console.warn("Gamification progress could not be saved:", error.message);
      return;
    }

    const next = Array.isArray(data) ? data[0] : data;
    if (next) setProgress(next as UserProgress);
  }

  async function reviewWord(word: Vocabulary, rating: ReviewRating) {
    if (!user) return;
    const update = getReviewUpdate(word, rating);
    const patch = {
      mastery_level: update.newLevel,
      last_reviewed_at: update.lastReviewedAt,
      next_review_at: update.nextReviewAt,
      review_count: update.reviewCount,
      correct_count: update.correctCount,
      wrong_count: update.wrongCount,
      updated_at: new Date().toISOString(),
    };

    setWords((prev) => prev.map((w) => w.id === word.id ? { ...w, ...patch } : w));
    const { error } = await supabase.from("vocabularies").update(patch).eq("id", word.id).eq("user_id", user.id);
    if (error) {
      showToast(error.message);
      await loadData(user.id, true);
      return;
    }
    await supabase.from("review_history").insert({
      user_id: user.id,
      vocabulary_id: word.id,
      rating,
      previous_level: update.previousLevel,
      new_level: update.newLevel,
    });

    const reviewXp = rating === 0 ? 2 : rating === 1 ? 5 : rating === 2 ? 8 : 10;
    await recordActivity(reviewXp, rating !== 0, false);
  }

  async function prepareGuestMigration(nextMode: "login" | "register", prefillEmail?: string) {
    if (!user?.is_anonymous) return;

    const [decksRes, wordsRes, reviewsRes] = await Promise.all([
      supabase.from("decks").select("*").eq("user_id", user.id).order("created_at", { ascending: true }),
      supabase.from("vocabularies").select("*").eq("user_id", user.id).order("created_at", { ascending: true }),
      supabase.from("review_history").select("*").eq("user_id", user.id).order("reviewed_at", { ascending: true }),
    ]);

    if (decksRes.error) throw new Error(decksRes.error.message);
    if (wordsRes.error) throw new Error(wordsRes.error.message);
    if (reviewsRes.error) throw new Error(reviewsRes.error.message);

    localStorage.setItem("lexibloom-guest-backup", JSON.stringify({
      decks: decksRes.data ?? [],
      words: wordsRes.data ?? [],
      reviews: reviewsRes.data ?? [],
      savedAt: new Date().toISOString(),
    }));
    localStorage.setItem("lexibloom-auth-next-mode", nextMode);
    if (prefillEmail) localStorage.setItem("lexibloom-auth-prefill-email", prefillEmail);

    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) throw new Error(error.message);
  }



  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showToast(error.message);
      return;
    }
    setView("dashboard");
    setDeckFilter("all");
    setQuery("");
  }

  if (!authReady) {
    return <div className="boot-screen"><div className="brand-mark"><BookOpen size={28} /></div><Loader2 className="spin" size={22} /><p>Preparing your vocabulary space…</p></div>;
  }

  if (!user || user.is_anonymous || recoveryMode) {
    return (
      <AuthScreen
        user={user}
        recoveryMode={recoveryMode}
        onPrepareGuestMigration={prepareGuestMigration}
        onRecoveryDone={() => {
          setRecoveryMode(false);
          const url = new URL(window.location.href);
          url.searchParams.delete("recovery");
          window.history.replaceState({}, "", url.pathname + url.search);
        }}
      />
    );
  }

  if (loading) {
    return <div className="boot-screen"><div className="brand-mark"><BookOpen size={28} /></div><Loader2 className="spin" size={22} /><p>Loading your vocabulary…</p></div>;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="logo" onClick={() => setView("dashboard")}>
          <span className="logo-icon"><BookOpen size={21} /></span>
          <span><strong>LexiBloom</strong><small>Learn a little every day</small></span>
        </button>

        <nav>
          <div className="nav-label">LEARN</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)}><Icon size={19} /><span>{item.label}</span>{item.id === "flashcards" && stats.due > 0 && <b>{stats.due}</b>}</button>;
          })}
        </nav>

        <div className="sidebar-card">
          <div className="sidebar-card-icon"><Flame size={18} /></div>
          <div><strong>{effectiveStreak(progress)} day streak · {progress.total_xp} XP</strong><p>{stats.due ? `${stats.due} cards are ready to review.` : "Try a quick vocabulary game."}</p></div>
          <button onClick={() => setView(stats.due ? "flashcards" : "games")}>{stats.due ? "Study now" : "Play game"}</button>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item compact-row" onClick={toggleTheme}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}<span>{theme === "light" ? "Dark mode" : "Light mode"}</span></button>
          <div className="profile-chip"><span className="avatar">{(user.user_metadata?.display_name || user.email || "U").slice(0, 1).toUpperCase()}</span><div><strong>{user.user_metadata?.display_name || user.email?.split("@")[0] || "Learner"}</strong><small>{user.email || (online ? "Synced with Supabase" : "Offline")}</small></div><button className="profile-signout" onClick={handleSignOut} title="Sign out"><LogOut size={15} /></button></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="mobile-brand"><span className="logo-icon"><BookOpen size={18} /></span><strong>LexiBloom</strong></div>
          <div className="global-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your vocabulary..." onFocus={() => setView("words")} /><kbd>⌘ K</kbd></div>
          <div className="topbar-actions">
            <span className={`sync-status ${online ? "online" : ""}`}>{syncing ? <Loader2 className="spin" size={14} /> : online ? <Check size={14} /> : <WifiOff size={14} />}{syncing ? "Syncing" : online ? "Live sync" : "Offline"}</span>
            <button className="icon-btn theme-mobile" onClick={toggleTheme}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
            <button className="icon-btn account-logout" onClick={handleSignOut} title={`Sign out ${user.email ?? ""}`}><LogOut size={17} /></button>
            <button className="button primary" onClick={() => { setEditingWord(null); setWordModalOpen(true); }}><Plus size={17} /> Add word</button>
          </div>
        </header>

        <section className="content">
          {view === "dashboard" && <Dashboard words={words} decks={decks} stats={stats} progress={progress} weakWords={weakWords} setView={setView} openAdd={() => { setEditingWord(null); setWordModalOpen(true); }} />}
          {view === "words" && <VocabularyView words={filteredWords} decks={decks} query={query} setQuery={setQuery} deckFilter={deckFilter} setDeckFilter={setDeckFilter} levelFilter={levelFilter} setLevelFilter={setLevelFilter} onEdit={(w) => { setEditingWord(w); setWordModalOpen(true); }} onDelete={deleteWord} onFavorite={toggleFavorite} onImport={() => setImportModalOpen(true)} onAdd={() => { setEditingWord(null); setWordModalOpen(true); }} />}
          {view === "flashcards" && (
            <div>
              <PageHeader eyebrow="FOCUS MODE" title="Flashcard session" subtitle="Active recall + spaced repetition. Rate the card after revealing the answer." action={<select className="clean-select" value={deckFilter} onChange={(e) => setDeckFilter(e.target.value)}><option value="all">All decks</option>{decks.map((d) => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}</select>} />
              <FlashcardStudy words={flashWords} onReview={reviewWord} />
            </div>
          )}
          {view === "games" && <GamesView words={words} progress={progress} onActivity={recordActivity} />}
          {view === "decks" && <DecksView decks={decks} words={words} onAdd={() => setDeckModalOpen(true)} onDelete={deleteDeck} onOpen={(id) => { setDeckFilter(id); setView("words"); }} />}
          {view === "stats" && <StatsView words={words} decks={decks} stats={stats} />}
          {view === "achievements" && <AchievementsView words={words} progress={progress} />}
        </section>
      </main>

      <nav className="mobile-nav">
        {navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}><Icon size={20} /><span>{item.label === "Vocabulary" ? "Words" : item.label}</span></button>; })}
      </nav>

      <WordModal
        open={wordModalOpen}
        decks={decks}
        initial={editingWord}
        draftStorageKey={`lexibloom-word-draft:${user.id}`}
        onClose={() => { setWordModalOpen(false); setEditingWord(null); }}
        onSave={saveWord}
      />
      <DeckModal open={deckModalOpen} onClose={() => setDeckModalOpen(false)} onSave={createDeck} />
      <ImportWordsModal
        open={importModalOpen}
        userId={user.id}
        decks={decks}
        words={words}
        onClose={() => setImportModalOpen(false)}
        onImported={async ({ inserted, updated, skipped }) => {
          showToast(`Import xong: ${inserted} mới, ${updated} cập nhật${skipped ? `, ${skipped} bỏ qua` : ""}`);
          await loadData(user.id, true);
        }}
      />
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

function PageHeader({ eyebrow, title, subtitle, action }: { eyebrow: string; title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function Dashboard({ words, decks, stats, progress, weakWords, setView, openAdd }: { words: Vocabulary[]; decks: Deck[]; stats: { total: number; mastered: number; due: number; reviewed: number; accuracy: number; mastery: number }; progress: UserProgress; weakWords: Vocabulary[]; setView: (v: ViewName) => void; openAdd: () => void }) {
  const recent = words.slice(0, 5);
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";
  return (
    <>
      <div className="hero-row">
        <div>
          <div className="eyebrow"><Sparkles size={14} /> YOUR LEARNING SPACE</div>
          <h1>{greeting} 👋</h1>
          <p>Small reviews, repeated often, turn new words into long-term memory.</p>
        </div>
        <button className="button primary large" onClick={() => setView("flashcards")}><Brain size={19} /> Start review <span>{stats.due}</span></button>
      </div>

      <div className="stat-grid">
        <StatCard icon={<Library size={20} />} label="Total words" value={stats.total} hint={`${decks.length} decks`} tone="violet" />
        <StatCard icon={<Brain size={20} />} label="Due today" value={stats.due} hint="ready to review" tone="orange" />
        <StatCard icon={<Zap size={20} />} label="Mastery" value={`${stats.mastery}%`} hint={`${stats.mastered} mastered`} tone="teal" />
        <StatCard icon={<ChartNoAxesCombined size={20} />} label="Accuracy" value={`${stats.accuracy}%`} hint={`${stats.reviewed} reviews`} tone="blue" />
      </div>

      <GamificationDashboard progress={progress} weakWords={weakWords} setView={setView} />

      <div className="dashboard-grid">
        <section className="panel focus-panel">
          <div className="panel-title"><div><span>Today&apos;s focus</span><h2>Build your memory loop</h2></div><button className="text-button" onClick={() => setView("flashcards")}>Open session →</button></div>
          <div className="focus-content">
            <div className="mastery-ring" style={{ "--progress": `${Math.max(2, stats.mastery)}%` } as React.CSSProperties}><div><strong>{stats.mastery}%</strong><span>mastery</span></div></div>
            <div className="focus-copy"><h3>{stats.due ? `${stats.due} cards are waiting for you` : "Your reviews are complete"}</h3><p>{stats.due ? "A short focused session now is better than a long session later." : "Add a few fresh words, or explore a deck you want to strengthen."}</p><div className="focus-actions"><button className="button primary" onClick={() => setView("flashcards")}><Brain size={17} /> Review now</button><button className="button secondary" onClick={openAdd}><Plus size={17} /> New word</button></div></div>
          </div>
        </section>

        <section className="panel streak-panel">
          <div className="panel-title"><div><span>Learning streak</span><h2>Consistency</h2></div><div className="round-badge"><Flame size={18} /></div></div>
          <div className="streak-live"><div><strong>{effectiveStreak(progress)}</strong><span>current days</span></div><div><strong>{progress.best_streak}</strong><span>best streak</span></div></div>
          <p className="streak-copy"><strong>{effectiveDailyAnswers(progress) >= DAILY_GOAL ? "Daily challenge complete 🎉" : `${Math.max(0, DAILY_GOAL - effectiveDailyAnswers(progress))} answers left today`}</strong><br />A quick game or review keeps your rhythm alive.</p>
        </section>
      </div>

      <section className="panel recent-panel">
        <div className="panel-title"><div><span>Recently added</span><h2>Your newest vocabulary</h2></div><button className="text-button" onClick={() => setView("words")}>View all →</button></div>
        {recent.length ? <div className="recent-list">{recent.map((word) => <div className="recent-item" key={word.id}><div className="word-orb">{word.word.slice(0, 1).toUpperCase()}</div><div className="recent-word"><strong>{word.word}</strong><span>{word.pronunciation || word.part_of_speech || "Vocabulary"}</span></div><div className="recent-meaning">{word.meaning}</div><span className={`level-pill level-${word.mastery_level}`}>{masteryLabel(word.mastery_level)}</span></div>)}</div> : <EmptyWords openAdd={openAdd} />}
      </section>
    </>
  );
}


function GamificationDashboard({ progress, weakWords, setView }: { progress: UserProgress; weakWords: Vocabulary[]; setView: (v: ViewName) => void }) {
  const level = levelInfo(progress.total_xp);
  const streak = effectiveStreak(progress);
  const daily = effectiveDailyAnswers(progress);
  const dailyPct = Math.min(100, Math.round(daily / DAILY_GOAL * 100));

  return <div className="gamification-dashboard">
    <section className="panel xp-panel">
      <div className="xp-main"><div className="xp-level"><Trophy size={21} /><span>LV</span><strong>{level.level}</strong></div><div><span className="mini-label">YOUR LEVEL</span><h3>{progress.total_xp.toLocaleString()} XP</h3><p>{level.currentXp} / {level.neededXp} XP toward level {level.level + 1}</p></div></div>
      <div className="xp-progress"><span style={{ width: `${level.percent}%` }} /></div>
      <button className="text-button" onClick={() => setView("games")}>Earn XP in Games →</button>
    </section>
    <section className="panel daily-panel">
      <div className="daily-ring" style={{ "--daily": `${Math.max(2, dailyPct)}%` } as React.CSSProperties}><div><Flame size={19} /><strong>{streak}</strong><span>day streak</span></div></div>
      <div><span className="mini-label">DAILY CHALLENGE</span><h3>{Math.min(daily, DAILY_GOAL)} / {DAILY_GOAL} answers</h3><p>Mix flashcards and games to complete today&apos;s goal.</p><button className="text-button" onClick={() => setView("games")}>Continue challenge →</button></div>
    </section>
    <section className="panel weak-panel">
      <div className="panel-title compact"><div><span>Smart practice</span><h2>Weak words</h2></div><button className="text-button" onClick={() => setView("games")}>Practice →</button></div>
      {weakWords.length ? <div className="weak-list">{weakWords.slice(0, 4).map((word) => <div key={word.id}><span>{word.word.slice(0, 1).toUpperCase()}</span><div><strong>{word.word}</strong><small>{word.meaning}</small></div><b>{word.wrong_count} misses</b></div>)}</div> : <div className="weak-empty"><Check size={18} /><span>No weak words yet. Keep practicing!</span></div>}
    </section>
  </div>;
}

function StatCard({ icon, label, value, hint, tone }: { icon: React.ReactNode; label: string; value: string | number; hint: string; tone: string }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{hint}</small></div></div>;
}

function EmptyWords({ openAdd }: { openAdd: () => void }) {
  return <div className="empty-inline"><div className="empty-icon"><BookOpen size={24} /></div><div><strong>Your vocabulary library is empty</strong><p>Add your first word and LexiBloom will schedule it for review.</p></div><button className="button primary" onClick={openAdd}><Plus size={16} /> Add first word</button></div>;
}

function VocabularyView({ words, decks, query, setQuery, deckFilter, setDeckFilter, levelFilter, setLevelFilter, onEdit, onDelete, onFavorite, onImport, onAdd }: {
  words: Vocabulary[]; decks: Deck[]; query: string; setQuery: (s: string) => void; deckFilter: string; setDeckFilter: (s: string) => void; levelFilter: string; setLevelFilter: (s: string) => void; onEdit: (w: Vocabulary) => void; onDelete: (w: Vocabulary) => void; onFavorite: (w: Vocabulary) => void; onImport: () => void; onAdd: () => void;
}) {
  return (
    <>
      <PageHeader eyebrow="YOUR LIBRARY" title="Vocabulary" subtitle="Search, organize and refine every word you are learning." action={<div className="page-actions"><button className="button secondary" onClick={onImport}><FileUp size={16} /> Import CSV / Excel</button><button className="button primary" onClick={onAdd}><Plus size={16} /> Add word</button></div>} />
      <div className="filterbar">
        <div className="search-wide"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search word, meaning, example or tag..." />{query && <button onClick={() => setQuery("")}><X size={16} /></button>}</div>
        <label className="select-wrap"><FolderOpen size={16} /><select value={deckFilter} onChange={(e) => setDeckFilter(e.target.value)}><option value="all">All decks</option>{decks.map((d) => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}</select><ChevronDown size={15} /></label>
        <label className="select-wrap"><Zap size={16} /><select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}><option value="all">All levels</option>{[0,1,2,3,4,5].map((l) => <option key={l} value={l}>{masteryLabel(l)}</option>)}</select><ChevronDown size={15} /></label>
      </div>

      <div className="table-card">
        <div className="table-head"><span>Word</span><span>Meaning</span><span>Deck</span><span>Mastery</span><span>Next review</span><span></span></div>
        {words.length ? words.map((word) => {
          const deck = decks.find((d) => d.id === word.deck_id);
          return <div className="table-row" key={word.id}>
            <div className="word-cell"><button className={`heart-btn ${word.favorite ? "active" : ""}`} onClick={() => onFavorite(word)}><Heart size={16} fill={word.favorite ? "currentColor" : "none"} /></button><div><strong>{word.word}</strong><span>{word.pronunciation || word.part_of_speech || ""}</span></div><button className="sound-mini" onClick={() => speak(word.word)}><Volume2 size={15} /></button></div>
            <div className="meaning-cell"><strong>{word.meaning}</strong>{word.example && <span>{word.example}</span>}</div>
            <div>{deck ? <span className="deck-chip" style={{ "--deck-color": deck.color } as React.CSSProperties}><i /> {deck.icon} {deck.name}</span> : <span className="muted">No deck</span>}</div>
            <div><span className={`level-pill level-${word.mastery_level}`}>{masteryLabel(word.mastery_level)}</span></div>
            <div><span className="date-cell">{word.next_review_at ? formatDate(word.next_review_at) : "Now"}</span></div>
            <div className="row-actions"><button onClick={() => onEdit(word)} title="Edit"><Pencil size={16} /></button><button className="danger" onClick={() => onDelete(word)} title="Delete"><Trash2 size={16} /></button></div>
          </div>;
        }) : <div className="empty-table"><Search size={26} /><strong>No vocabulary found</strong><span>Try another search or filter.</span></div>}
      </div>
      <div className="result-count">Showing <strong>{words.length}</strong> words</div>
    </>
  );
}

function DecksView({ decks, words, onAdd, onDelete, onOpen }: { decks: Deck[]; words: Vocabulary[]; onAdd: () => void; onDelete: (d: Deck) => void; onOpen: (id: string) => void }) {
  return <>
    <PageHeader eyebrow="COLLECTIONS" title="Your decks" subtitle="Organize vocabulary by exam, topic, class or personal goal." action={<button className="button primary" onClick={onAdd}><Plus size={17} /> New deck</button>} />
    <div className="deck-grid">
      {decks.map((deck) => {
        const deckWords = words.filter((w) => w.deck_id === deck.id);
        const mastered = deckWords.filter((w) => w.mastery_level >= 5).length;
        const progress = deckWords.length ? Math.round(mastered / deckWords.length * 100) : 0;
        return <article className="deck-card" key={deck.id} onClick={() => onOpen(deck.id)}>
          <div className="deck-accent" style={{ background: deck.color }} />
          <div className="deck-top"><div className="deck-icon" style={{ background: `${deck.color}18`, color: deck.color }}>{deck.icon}</div><button className="more-btn" onClick={(e) => { e.stopPropagation(); onDelete(deck); }} title="Delete deck"><Trash2 size={16} /></button></div>
          <h3>{deck.name}</h3><p>{deck.description || "A focused collection for your vocabulary."}</p>
          <div className="deck-meta"><span><strong>{deckWords.length}</strong> words</span><span><strong>{mastered}</strong> mastered</span></div>
          <div className="deck-progress"><span style={{ width: `${progress}%`, background: deck.color }} /></div>
          <div className="deck-footer"><span>{progress}% complete</span><span>Open deck →</span></div>
        </article>;
      })}
      <button className="deck-card add-deck" onClick={onAdd}><div className="add-circle"><Plus size={24} /></div><strong>Create a new deck</strong><span>Build a collection around your next learning goal.</span></button>
    </div>
  </>;
}

function StatsView({ words, decks, stats }: { words: Vocabulary[]; decks: Deck[]; stats: { total: number; mastered: number; due: number; reviewed: number; accuracy: number; mastery: number } }) {
  const levels = [0, 1, 2, 3, 4, 5].map((level) => ({ level, count: words.filter((w) => w.mastery_level === level).length }));
  const max = Math.max(1, ...levels.map((x) => x.count));
  return <>
    <PageHeader eyebrow="INSIGHTS" title="Learning progress" subtitle="See how your vocabulary is moving from new to mastered." />
    <div className="stat-grid">
      <StatCard icon={<Library size={20} />} label="Vocabulary" value={stats.total} hint="all saved words" tone="violet" />
      <StatCard icon={<Check size={20} />} label="Mastered" value={stats.mastered} hint="level 5 words" tone="teal" />
      <StatCard icon={<Brain size={20} />} label="Reviews" value={stats.reviewed} hint="all-time attempts" tone="orange" />
      <StatCard icon={<Zap size={20} />} label="Accuracy" value={`${stats.accuracy}%`} hint="good/hard/easy" tone="blue" />
    </div>
    <div className="stats-layout">
      <section className="panel chart-panel"><div className="panel-title"><div><span>Mastery distribution</span><h2>Where your words are now</h2></div></div><div className="bar-chart">{levels.map(({ level, count }) => <div className="bar-item" key={level}><div className="bar-value">{count}</div><div className="bar-track"><span style={{ height: `${Math.max(5, count / max * 100)}%` }} /></div><div className="bar-label">{masteryLabel(level)}</div></div>)}</div></section>
      <section className="panel"><div className="panel-title"><div><span>Deck overview</span><h2>Collections</h2></div></div><div className="deck-stats-list">{decks.map((deck) => { const c = words.filter((w) => w.deck_id === deck.id).length; const m = words.filter((w) => w.deck_id === deck.id && w.mastery_level >= 5).length; const pct = c ? Math.round(m / c * 100) : 0; return <div key={deck.id}><div className="deck-stat-title"><span>{deck.icon} {deck.name}</span><strong>{pct}%</strong></div><div className="mini-progress"><span style={{ width: `${pct}%`, background: deck.color }} /></div><small>{m} of {c} mastered</small></div>; })}</div></section>
    </div>
  </>;
}
