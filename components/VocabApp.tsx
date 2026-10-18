"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen, Brain, ChartNoAxesCombined, Check, ChevronDown, FolderOpen, Heart,
  LayoutDashboard, Library, Loader2, Moon, MoreHorizontal, Pencil, Plus, Search, Sparkles,
  Sun, Trash2, Volume2, VolumeX, Wifi, WifiOff, Download, X, Zap, LogOut, Gamepad2, Trophy, FileUp,
  Menu, Pin, PinOff, BookOpenCheck
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Deck, ReviewRating, UserProgress, ViewName, Vocabulary } from "@/lib/types";
import { getReviewUpdate, isDue, masteryLabel } from "@/lib/srs";
import { effectiveDailyAnswers, effectiveStreak, emptyProgress, getWeakWords, levelInfo, localDateKey } from "@/lib/gamification";
import dynamic from "next/dynamic";
import type { WordDraft } from "./WordModal";
import DeckModal, { type DeckDraft } from "./DeckModal";
import { reviewKeyFor, useReviewIds } from "@/lib/reviewList";
import { useSoundOn } from "@/lib/sound";
import { GOAL_OPTIONS, useDailyGoal } from "@/lib/dailyGoal";
import ActivityHeatmap from "./ActivityHeatmap";
import { clearOfflineData, useInstallPrompt } from "@/lib/pwa";
import { profileName } from "@/lib/profile";
import UserAvatar from "./UserAvatar";
import { LogoMark } from "./Logo";
import { SootBackdrop, SootBuddy, SootCrew, useSootEyes, type CrewMember } from "./Soot";

// Screens that aren't needed for the first paint load on demand, keeping the initial bundle small.
const loadAuth = () => import("./AuthScreen");
const loadFlashcards = () => import("./FlashcardStudy");
const loadLesson = () => import("./LessonPlayer");
const loadGames = () => import("./GamesView");
const loadWordModal = () => import("./WordModal");
const loadImport = () => import("./ImportWordsModal");
const loadProfile = () => import("./ProfileView");
const loadGrammar = () => import("./GrammarView");
const AuthScreen = dynamic(loadAuth, { loading: () => <BootScreen text="Loading…" /> });
const FlashcardStudy = dynamic(loadFlashcards);
const LessonPlayer = dynamic(loadLesson);
const GamesView = dynamic(loadGames);
const AchievementsView = dynamic(() => loadGames().then((m) => m.AchievementsView));
const WordModal = dynamic(loadWordModal);
const ImportWordsModal = dynamic(loadImport);
const ProfileView = dynamic(loadProfile);
const GrammarView = dynamic(loadGrammar, { loading: () => <BootScreen text="Đang mở ngữ pháp…" /> });

const navItems: { id: ViewName; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "learn", label: "Học từ mới", icon: Sparkles },
  { id: "grammar", label: "Ngữ pháp", icon: BookOpenCheck },
  { id: "words", label: "Vocabulary", icon: Library },
  { id: "flashcards", label: "Flashcards", icon: Brain },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "decks", label: "Decks", icon: FolderOpen },
  { id: "stats", label: "Progress", icon: ChartNoAxesCombined },
  { id: "achievements", label: "Achievements", icon: Trophy },
];

const navGroups: { label: string; items: typeof navItems }[] = [
  { label: "LEARN", items: navItems.filter(({ id }) => ["dashboard", "learn", "grammar", "words", "decks"].includes(id)) },
  { label: "PRACTICE", items: navItems.filter(({ id }) => ["flashcards", "games"].includes(id)) },
  { label: "PROGRESS", items: navItems.filter(({ id }) => ["stats", "achievements"].includes(id)) },
];

// The phone bottom bar keeps the five daily screens; the rest live behind "Thêm" (the side menu).
const MOBILE_TABS: ViewName[] = ["dashboard", "learn", "flashcards", "games", "words"];

const mobileNavLabels: Record<ViewName, string> = {
  dashboard: "Home",
  learn: "Learn",
  grammar: "Grammar",
  words: "Words",
  flashcards: "Cards",
  games: "Games",
  decks: "Decks",
  stats: "Stats",
  achievements: "Awards",
  profile: "Profile",
};

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

// Sits inside the hero card on the right, peeking up from its bottom edge.
const HERO_CREW: CrewMember[] = [
  { x: 12, size: 70, look: { bloom: "green" } },
  { x: 35, size: 88, look: { hat: true, holdR: "star-yellow" }, bubble: true },
  { x: 62, size: 108, look: { bloom: "pink", holdL: "star-pink", holdR: "flower-yellow" } },
  { x: 88, size: 70, look: { hat: true } },
];

function BootScreen({ text }: { text: string }) {
  return <div className="boot-screen"><LogoMark size={64} className="boot-logo" /><BootCrew /><p>{text}</p></div>;
}

function BootCrew() {
  return (
    <div className="boot-crew">
      <SootBuddy size={30} mood="busy" look={{ bloom: "pink" }} />
      <SootBuddy size={38} mood="busy" look={{ hat: true }} />
      <SootBuddy size={30} mood="busy" look={{ bloom: "yellow" }} />
    </div>
  );
}

const STARTER_DECK = { name: "My Vocabulary", description: "Your first vocabulary collection", icon: "🌱", color: "#6d5dfc" };
const isStarterDeck = (d: Deck) => d.name === STARTER_DECK.name && d.description === STARTER_DECK.description;

// One starter-deck creation per user at a time, however many loads ask for it.
const starterRequests = new Map<string, Promise<Deck[]>>();

function ensureDefaultDeck(uid: string): Promise<Deck[]> {
  const pending = starterRequests.get(uid);
  if (pending) return pending;
  const request = (async () => {
    await supabase.from("decks").insert({ user_id: uid, ...STARTER_DECK });
    const { data } = await supabase.from("decks").select("*").eq("user_id", uid).order("created_at", { ascending: true });
    return (data ?? []) as Deck[];
  })().finally(() => starterRequests.delete(uid));
  starterRequests.set(uid, request);
  return request;
}

export default function VocabApp() {
  useSootEyes();

  // Signed-out visitors will need the login screen right away: start fetching it now.
  useEffect(() => {
    try {
      const hasSession = Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token"));
      if (!hasSession) void loadAuth();
    } catch {}
  }, []);

  // Once the app is idle, fetch the on-demand screens in the background so opening them is instant.
  useEffect(() => {
    const preload = () => { void loadFlashcards(); void loadLesson(); void loadGames(); void loadWordModal(); };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = idle ? idle(preload) : window.setTimeout(preload, 2500);
    return () => { if (!idle) window.clearTimeout(id); };
  }, []);
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [toast, setToast] = useState("");
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [authHold, setAuthHold] = useState(false);
  // Deck id of the lesson on screen ("all" for every deck), or null when closed.
  const [lessonDeck, setLessonDeck] = useState<string | null>(null);
  // Fixed word list for a review lesson, captured when it starts.
  const [lessonIds, setLessonIds] = useState<string[] | null>(null);
  const reviewKey = reviewKeyFor(user?.id ?? "guest");
  const [soundOn, toggleSound] = useSoundOn();
  const [dailyGoal, setDailyGoal] = useDailyGoal(user?.id ?? "guest");
  const { canInstall, install } = useInstallPrompt();
  const [reviewIds] = useReviewIds(reviewKey);
  const startLesson = (deckId: string) => { setLessonIds(null); setLessonDeck(deckId); };
  const startReviewLesson = (ids: string[]) => { setLessonIds(ids); setLessonDeck("review"); };
  const currentUserIdRef = useRef<string | null>(null);
  const draftRestoreCheckedRef = useRef<string | null>(null);

  const deckWords = useMemo(
    () => (deckFilter === "all" ? words : words.filter((w) => w.deck_id === deckFilter)),
    [words, deckFilter],
  );

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
      nextDecks = await ensureDefaultDeck(uid);
    }

    // Several loads racing on a brand-new account used to create duplicate starter decks.
    // Keep the first one and remove any extra empty copies.
    const starters = nextDecks.filter(isStarterDeck);
    if (!wordsRes.error && starters.length > 1) {
      const used = new Set(((wordsRes.data ?? []) as Vocabulary[]).map((w) => w.deck_id));
      const extras = starters.slice(1).filter((d) => !used.has(d.id));
      if (extras.length) {
        const { error } = await supabase.from("decks").delete().in("id", extras.map((d) => d.id)).eq("user_id", uid);
        if (!error) nextDecks = nextDecks.filter((d) => !extras.includes(d));
      }
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

    const savedSidebarPinned = localStorage.getItem("lexibloom-sidebar-pinned") === "true";
    if (savedSidebarPinned) {
      setSidebarPinned(true);
      setSidebarOpen(true);
    }

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

  const closeSidebar = () => {
    setSidebarOpen(false);
    if (sidebarPinned) {
      setSidebarPinned(false);
      localStorage.setItem("lexibloom-sidebar-pinned", "false");
    }
  };

  const toggleSidebar = () => {
    if (sidebarOpen) closeSidebar();
    else setSidebarOpen(true);
  };

  const toggleSidebarPin = () => {
    const next = !sidebarPinned;
    setSidebarPinned(next);
    localStorage.setItem("lexibloom-sidebar-pinned", String(next));
    if (next) setSidebarOpen(true);
  };

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

  async function saveNote(word: Vocabulary, note: string) {
    if (!user) return;
    const patch = { note: note.trim() || null, updated_at: new Date().toISOString() };
    setWords((prev) => prev.map((w) => w.id === word.id ? { ...w, ...patch } : w));
    const { error } = await supabase.from("vocabularies").update(patch).eq("id", word.id).eq("user_id", user.id);
    if (error) {
      showToast(error.message);
      await loadData(user.id, true);
      return;
    }
    showToast("Đã lưu ghi chú");
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
    clearOfflineData();
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
    return <BootScreen text="Preparing your vocabulary space…" />;
  }

  if (!user || user.is_anonymous || recoveryMode || authHold) {
    return (
      <AuthScreen
        user={user}
        onHold={setAuthHold}
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
    return <BootScreen text="Loading your vocabulary…" />;
  }

  return (
    <div className={`app-shell ${sidebarOpen ? "menu-open" : ""} ${sidebarPinned ? "menu-pinned" : ""}`}>
      <SootBackdrop />
      {!sidebarPinned && <button className="menu-rail" onClick={toggleSidebar} aria-label="Open function menu"><Menu size={21} /></button>}
      {sidebarOpen && !sidebarPinned && <button className="menu-backdrop" onClick={closeSidebar} aria-label="Close function menu" />}
      <aside className="sidebar">
        <div className="sidebar-head">
          <button className="sidebar-close" onClick={closeSidebar} aria-label="Close menu"><X size={18} /></button>
          <button className={`sidebar-pin ${sidebarPinned ? "pinned" : ""}`} onClick={toggleSidebarPin} aria-label={sidebarPinned ? "Unpin menu" : "Pin menu"} aria-pressed={sidebarPinned} title={sidebarPinned ? "Unpin menu" : "Pin menu"}>
            {sidebarPinned ? <PinOff size={16} /> : <Pin size={16} />}<span>{sidebarPinned ? "Đã ghim" : "Ghim"}</span>
          </button>
        </div>
        <button className="logo" onClick={() => setView("dashboard")}>
          <LogoMark size={42} />
          <span><strong className="brand-name"><span>TV</span>-English</strong><small>Learn a little every day</small></span>
        </button>

        <nav aria-label="Main navigation">
          {navGroups.map((group) => <div className="nav-group" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              return <button key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} aria-current={view === item.id ? "page" : undefined} onClick={() => { setView(item.id); if (!sidebarPinned) setSidebarOpen(false); }}><Icon size={19} /><span>{item.label}</span>{item.id === "flashcards" && stats.due > 0 && <b>{stats.due}</b>}</button>;
            })}
          </div>)}
        </nav>

        <div className="sidebar-card">
          <SootBuddy size={46} look={{ hat: true, holdR: "star-yellow" }} mood={stats.due ? "curious" : "idle"} tool={stats.due ? "magnifier" : undefined} />
          <div><strong>{effectiveStreak(progress)} day streak · {progress.total_xp} XP</strong><p>{stats.due ? `${stats.due} cards are ready to review.` : "Try a quick vocabulary game."}</p></div>
          <button onClick={() => setView(stats.due ? "flashcards" : "games")}>{stats.due ? "Study now" : "Play game"}</button>
        </div>

        <div className="sidebar-bottom">
          {canInstall && <button className="nav-item compact-row install-app" onClick={() => void install()}><Download size={18} /><span>Cài ứng dụng TV-English</span></button>}
          <button className="nav-item compact-row" onClick={toggleTheme}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}<span>{theme === "light" ? "Dark mode" : "Light mode"}</span></button>
          <div className={`profile-chip${view === "profile" ? " active" : ""}`}>
            <button className="profile-open" onClick={() => { setView("profile"); if (!sidebarPinned) setSidebarOpen(false); }} title="Trang cá nhân">
              <UserAvatar user={user} size={36} />
              <div><strong>{profileName(user)}</strong><small>{user.email || (online ? "Synced with Supabase" : "Offline")}</small></div>
            </button>
            <button className="profile-signout" onClick={handleSignOut} title="Sign out"><LogOut size={15} /></button>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button className="icon-btn sidebar-toggle" onClick={toggleSidebar} aria-label={sidebarOpen ? "Close menu" : "Open menu"} aria-expanded={sidebarOpen} title={sidebarOpen ? "Close menu" : "Open menu"}>
            <Menu size={18} />
          </button>
          <div className="mobile-brand"><LogoMark size={34} /><strong className="brand-name"><span>TV</span>-English</strong></div>
          <div className="global-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your vocabulary..." onFocus={() => setView("words")} /><kbd>⌘ K</kbd></div>
          <div className="topbar-actions">
            <span className={`sync-status ${online ? "online" : ""}`}>{syncing ? <Loader2 className="spin" size={14} /> : online ? <Check size={14} /> : <WifiOff size={14} />}{syncing ? "Syncing" : online ? "Live sync" : "Offline"}</span>
            <button className="icon-btn desktop-only" onClick={toggleSound} aria-label={soundOn ? "Tắt hiệu ứng âm thanh" : "Bật hiệu ứng âm thanh"} title={soundOn ? "Tắt hiệu ứng âm thanh" : "Bật hiệu ứng âm thanh"}>{soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>
            {canInstall && <button className="icon-btn install-app" onClick={() => void install()} aria-label="Cài ứng dụng" title="Cài ứng dụng TV-English"><Download size={18} /></button>}
            <button className="icon-btn theme-mobile desktop-only" onClick={toggleTheme}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
            <button className="icon-btn account-logout desktop-only" onClick={handleSignOut} title={`Sign out ${user.email ?? ""}`}><LogOut size={17} /></button>
            <button className="topbar-avatar" onClick={() => setView("profile")} aria-label="Trang cá nhân" title="Trang cá nhân"><UserAvatar user={user} size={36} /></button>
            <button className="button primary" onClick={() => { setEditingWord(null); setWordModalOpen(true); }}><Plus size={17} /> Add word</button>
          </div>
        </header>

        <section className="content">
          {view === "dashboard" && <Dashboard name={profileName(user)} words={words} decks={decks} stats={stats} progress={progress} weakWords={weakWords} setView={setView} openDeck={(id) => { setDeckFilter(id); setView("words"); }} openAdd={() => { setEditingWord(null); setWordModalOpen(true); }} startLesson={startLesson} userId={user.id} dailyGoal={dailyGoal} setDailyGoal={setDailyGoal} />}
          {view === "profile" && <ProfileView user={user} progress={progress} wordCount={stats.total} masteredCount={stats.mastered} onUserUpdated={setUser} onSignOut={handleSignOut} theme={theme} onToggleTheme={toggleTheme} soundOn={soundOn} onToggleSound={toggleSound} />}
          {view === "learn" && <LearnHub words={words} decks={decks} startLesson={startLesson} reviewCount={words.filter((w) => reviewIds.includes(w.id)).length} startReview={() => startReviewLesson(reviewIds)} />}
          {view === "grammar" && <GrammarView userId={user.id} onActivity={(xp, correct) => recordActivity(xp, correct, false)} />}
          {view === "words" && <VocabularyView words={filteredWords} decks={decks} query={query} setQuery={setQuery} deckFilter={deckFilter} setDeckFilter={setDeckFilter} levelFilter={levelFilter} setLevelFilter={setLevelFilter} onEdit={(w) => { setEditingWord(w); setWordModalOpen(true); }} onDelete={deleteWord} onFavorite={toggleFavorite} onImport={() => setImportModalOpen(true)} onAdd={() => { setEditingWord(null); setWordModalOpen(true); }} />}
          {view === "flashcards" && (
            <div>
              <PageHeader eyebrow="FOCUS MODE" title="Flashcard session" subtitle="Lật thẻ, tự nhớ nghĩa rồi chọn Đã thuộc hoặc Chưa thuộc. Từ chưa thuộc được ghi vào sổ Cần ôn." action={<select className="clean-select" value={deckFilter} onChange={(e) => setDeckFilter(e.target.value)}><option value="all">All decks</option>{decks.map((d) => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}</select>} />
              <FlashcardStudy words={deckWords} reviewKey={reviewKey} onReview={reviewWord} onSaveNote={saveNote} onPractice={startReviewLesson} />
            </div>
          )}
          {view === "games" && <GamesView words={words} progress={progress} onActivity={recordActivity} dailyGoal={dailyGoal} />}
          {view === "decks" && <DecksView decks={decks} words={words} onAdd={() => setDeckModalOpen(true)} onDelete={deleteDeck} onOpen={(id) => { setDeckFilter(id); setView("words"); }} />}
          {view === "stats" && <StatsView words={words} decks={decks} stats={stats} userId={user.id} dailyGoal={dailyGoal} todayAnswers={effectiveDailyAnswers(progress)} />}
          {view === "achievements" && <AchievementsView words={words} progress={progress} />}
        </section>
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.filter((item) => MOBILE_TABS.includes(item.id)).map((item) => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? "active" : ""} aria-current={view === item.id ? "page" : undefined} onClick={() => setView(item.id)}><Icon size={22} /><span>{mobileNavLabels[item.id]}</span></button>; })}
        <button className={["grammar", "decks", "stats", "achievements"].includes(view) || sidebarOpen ? "active" : ""} onClick={toggleSidebar} aria-label="Thêm mục"><Menu size={22} /><span>Thêm</span></button>
      </nav>

      {lessonDeck && (
        <LessonPlayer
          words={lessonIds ? words.filter((w) => lessonIds.includes(w.id)) : lessonDeck === "all" ? words : words.filter((w) => w.deck_id === lessonDeck)}
          title={lessonIds ? "Sổ Cần ôn" : lessonDeck === "all" ? "Tất cả bộ từ" : decks.find((d) => d.id === lessonDeck)?.name ?? "Bộ từ"}
          pool={words}
          reviewKey={reviewKey}
          review={!!lessonIds}
          onReview={reviewWord}
          onClose={() => setLessonDeck(null)}
        />
      )}
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
      {toast && <div className="toast"><SootBuddy size={30} mood="happy" look={{ bloom: "pink" }} /> {toast}</div>}
    </div>
  );
}

function PageHeader({ eyebrow, title, subtitle, action }: { eyebrow: string; title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function Dashboard({ name, words, decks, stats, progress, weakWords, setView, openDeck, openAdd, startLesson, userId, dailyGoal, setDailyGoal }: { startLesson: (deckId: string) => void; userId: string; dailyGoal: number; setDailyGoal: (goal: number) => void; name: string; words: Vocabulary[]; decks: Deck[]; stats: { total: number; mastered: number; due: number; reviewed: number; accuracy: number; mastery: number }; progress: UserProgress; weakWords: Vocabulary[]; setView: (v: ViewName) => void; openDeck: (id: string) => void; openAdd: () => void }) {
  const recent = words.slice(0, 4);
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";
  const streak = effectiveStreak(progress);
  return (
    <>
      <section className="learn-hero hero-card">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> YOUR LEARNING PATH</div>
          <h1>{greeting}, {name} 👋</h1>
          <p>{stats.due ? `The soot crew found ${stats.due} words waiting for review.` : "Pick up where you left off and keep your streak going."}</p>
          <div className="hero-actions">
            <button className="button primary large" onClick={() => startLesson("all")}><Sparkles size={19} /> Học từ mới</button>
            <button className="button secondary large" onClick={() => setView("flashcards")}><Brain size={19} /> Ôn tập <span>{stats.due}</span></button>
          </div>
        </div>
        <div className="hero-crew">
          <SootCrew
            members={HERO_CREW}
            mood={stats.due ? "curious" : "idle"}
            signs={[undefined, undefined, streak ? `🔥 ${streak}-day streak` : "Let's learn!"]}
            signTone="good"
          />
        </div>
      </section>

      <div className="learn-layout">
        <LearningPath decks={decks} words={words} openDeck={startLesson} onBrowse={() => setView("decks")} />
        <aside className="learn-aside">
          <section className="lesson-goal-card">
            <div className="lesson-goal-head"><span className="lesson-goal-icon">🔥</span><span>DAILY GOAL</span><strong>{Math.min(effectiveDailyAnswers(progress), dailyGoal)}/{dailyGoal}</strong></div>
            <div className="lesson-goal-track"><span style={{ width: `${Math.min(100, Math.round(effectiveDailyAnswers(progress) / dailyGoal * 100))}%` }} /></div>
            <p>{effectiveDailyAnswers(progress) >= dailyGoal ? "Đã đạt mục tiêu hôm nay — tuyệt vời! 🎉" : `Còn ${dailyGoal - effectiveDailyAnswers(progress)} câu nữa để đạt mục tiêu hôm nay.`}</p>
            <div className="goal-picker" role="group" aria-label="Mục tiêu mỗi ngày">
              <span>Mục tiêu:</span>
              {GOAL_OPTIONS.map((g) => <button key={g} className={g === dailyGoal ? "on" : ""} aria-pressed={g === dailyGoal} onClick={() => setDailyGoal(g)}>{g}</button>)}
            </div>
            <button className="text-button" onClick={() => setView("games")}>Practice now →</button>
          </section>
          <section className="learn-stats-card">
            <div className="learn-stat"><span>Words learned</span><strong>{stats.total}</strong></div>
            <div className="learn-stat"><span>Ready to review</span><strong>{stats.due}</strong></div>
            <div className="learn-stat"><span>Current streak</span><strong>{effectiveStreak(progress)} <small>days</small></strong></div>
          </section>
          <div className="learn-aside-actions">
            <button className="button secondary" onClick={openAdd}><Plus size={16} /> Add a word</button>
            <button className="button secondary" onClick={() => setView("games")}><Gamepad2 size={16} /> Play a game</button>
          </div>
        </aside>
      </div>

      <section className="panel heatmap-panel">
        <div className="panel-title"><div><span>LỊCH HỌC</span><h2>6 tháng gần đây</h2></div><button className="text-button" onClick={() => setView("stats")}>Xem cả năm →</button></div>
        <ActivityHeatmap userId={userId} goal={dailyGoal} weeks={26} today={effectiveDailyAnswers(progress)} refreshKey={stats.reviewed} compact />
      </section>

      <GamificationDashboard progress={progress} weakWords={weakWords} setView={setView} />

      <section className="panel recent-panel">
        <div className="panel-title"><div><span>RECENT WORDS</span><h2>Keep these fresh</h2></div><button className="text-button" onClick={() => setView("words")}>View all →</button></div>
        {recent.length ? <div className="recent-list">{recent.map((word) => <div className="recent-item" key={word.id}><div className="word-orb">{word.word.slice(0, 1).toUpperCase()}</div><div className="recent-word"><strong>{word.word}</strong><span>{word.pronunciation || word.part_of_speech || "Vocabulary"}</span></div><div className="recent-meaning">{word.meaning}</div><span className={`level-pill level-${word.mastery_level}`}>{masteryLabel(word.mastery_level)}</span></div>)}</div> : <EmptyWords openAdd={openAdd} />}
      </section>
    </>
  );
}

// Pick a deck to learn new words from, plus the lesson keyboard shortcuts.
function LearnHub({ words, decks, startLesson, reviewCount, startReview }: { words: Vocabulary[]; decks: Deck[]; startLesson: (deckId: string) => void; reviewCount: number; startReview: () => void }) {
  const summary = (list: Vocabulary[]) => ({
    total: list.length,
    fresh: list.filter((w) => w.review_count === 0).length,
    due: list.filter(isDue).length,
    mastered: list.filter((w) => w.mastery_level >= 5).length,
  });
  const all = summary(words);
  return <>
    <PageHeader eyebrow="LEARN" title="Học từ mới" subtitle="Xem từ mới, nghe rồi viết lại. Mỗi bài 6 từ, từ viết sai sẽ quay lại cuối bài." action={<button className="button primary" disabled={!words.length} onClick={() => startLesson("all")}><Sparkles size={17} /> Học ngẫu nhiên tất cả bộ</button>} />
    <div className="learn-hub">
      <div className="learn-deck-grid">
        {decks.map((deck) => {
          const s = summary(words.filter((w) => w.deck_id === deck.id));
          const pct = s.total ? Math.round(s.mastered / s.total * 100) : 0;
          return <article key={deck.id} className="learn-deck" style={{ "--deck-color": deck.color } as React.CSSProperties}>
            <div className="learn-deck-head"><span className="learn-deck-icon">{deck.icon}</span><div><h3>{deck.name}</h3><p>{s.total} từ · {pct}% thành thạo</p></div></div>
            <div className="learn-deck-stats"><span><b>{s.fresh}</b> từ mới</span><span><b>{s.due}</b> đến hạn</span></div>
            <div className="mini-progress"><span style={{ width: `${pct}%`, background: deck.color }} /></div>
            <button className="button primary" disabled={!s.total} onClick={() => startLesson(deck.id)}>{s.total ? "Học ngay" : "Chưa có từ"}</button>
          </article>;
        })}
      </div>
      <aside className="learn-side">
        <section className={`panel learn-review${reviewCount ? "" : " empty"}`}>
          <SootBuddy size={58} look={{ bloom: "pink", holdR: "star-yellow" }} mood={reviewCount ? "curious" : "happy"} tool={reviewCount ? "binoculars" : undefined} />
          <div>
            <strong>Từ chưa thuộc</strong>
            <span>{reviewCount ? `${reviewCount} từ trong sổ “Cần ôn”` : "Sổ “Cần ôn” đang trống"}</span>
          </div>
          <button className="button primary" disabled={!reviewCount} onClick={startReview}>Ôn bằng nghe – viết</button>
        </section>
        <section className="panel learn-overview">
          <SootBuddy size={64} look={{ hat: true, holdR: "star-yellow" }} mood={all.fresh ? "curious" : "happy"} tool={all.fresh ? "magnifier" : undefined} />
          <div><strong>{all.fresh}</strong><span>từ chưa học</span></div>
          <div><strong>{all.due}</strong><span>từ đến hạn ôn</span></div>
        </section>
        <section className="panel learn-keys">
          <h3>Phím tắt trong bài học</h3>
          <div><kbd>Tab</kbd><span>Lật thẻ Anh ⇄ Việt · xem nghĩa khi viết</span></div>
          <div><kbd>Enter</kbd><span>Qua từ mới · Kiểm tra · Tiếp tục</span></div>
          <div><kbd>Space</kbd><span>Nghe lại (khi viết: lật nghĩa nếu ô trống)</span></div>
          <div><kbd>Shift</kbd>+<kbd>Space</kbd><span>Nghe lại khi đang viết</span></div>
          <div><kbd>Esc</kbd><span>Thoát bài học</span></div>
        </section>
      </aside>
    </div>
  </>;
}

function LearningPath({ decks, words, openDeck, onBrowse }: { decks: Deck[]; words: Vocabulary[]; openDeck: (id: string) => void; onBrowse: () => void }) {
  const lessons = decks.map((deck) => {
    const deckWords = words.filter((word) => word.deck_id === deck.id);
    const mastered = deckWords.filter((word) => word.mastery_level >= 5).length;
    return { deck, count: deckWords.length, mastered, percent: deckWords.length ? Math.round(mastered / deckWords.length * 100) : 0 };
  });
  const currentIndex = lessons.findIndex((lesson) => lesson.percent < 100);
  const completed = lessons.filter((lesson) => lesson.percent === 100).length;

  return <section className="learning-path panel">
    <div className="path-unit-header">
      <div className="path-unit-badge"><BookOpen size={20} /></div>
      <div><span>YOUR UNITS</span><h2>Vocabulary path</h2><p>Learn a little every day</p></div>
      <span className="path-unit-count">{completed}/{lessons.length}</span>
    </div>
    {lessons.length ? <div className="path-route">
      {lessons.slice(0, 8).map((lesson, index) => {
        const done = lesson.percent === 100;
        const current = !done && (currentIndex === -1 ? index === lessons.length - 1 : index === currentIndex);
        return <div className={`path-step ${done ? "complete" : ""} ${current ? "current" : ""}`} key={lesson.deck.id}>
          <button className="path-node" onClick={() => openDeck(lesson.deck.id)} aria-label={`Open ${lesson.deck.name}`}>
            {done ? <Check size={22} /> : <span>{lesson.deck.icon || index + 1}</span>}
          </button>
          <button className="path-step-card" onClick={() => openDeck(lesson.deck.id)}>
            <span className="path-step-label">UNIT {index + 1} <i>{done ? "COMPLETE" : current ? "CONTINUE" : "YOUR DECK"}</i></span>
            <strong>{lesson.deck.name}</strong>
            <small>{lesson.count ? `${lesson.mastered} of ${lesson.count} words mastered` : "Add words to begin this unit"}</small>
            <span className="path-step-progress"><i style={{ width: `${lesson.percent}%` }} /></span>
          </button>
        </div>;
      })}
      {lessons.length > 8 && <button className="text-button path-more" onClick={onBrowse}>View all {lessons.length} units →</button>}
    </div> : <div className="path-empty"><SootBuddy size={64} look={{ bloom: "green", holdR: "flower-yellow" }} /><strong>Your path starts with a deck</strong><p>Create a vocabulary deck, then add words to begin learning.</p><button className="button secondary" onClick={onBrowse}>Browse decks</button></div>}
  </section>;
}


function GamificationDashboard({ progress, weakWords, setView }: { progress: UserProgress; weakWords: Vocabulary[]; setView: (v: ViewName) => void }) {
  const level = levelInfo(progress.total_xp);

  return <div className="gamification-dashboard">
    <section className="panel xp-panel">
      <div className="xp-main"><div className="xp-level"><Trophy size={21} /><span>LV</span><strong>{level.level}</strong></div><div><span className="mini-label">YOUR LEVEL</span><h3>{progress.total_xp.toLocaleString()} XP</h3><p>{level.currentXp} / {level.neededXp} XP toward level {level.level + 1}</p></div></div>
      <div className="xp-progress"><span style={{ width: `${level.percent}%` }} /></div>
      <button className="text-button" onClick={() => setView("games")}>Earn XP in Games →</button>
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
  return <div className="empty-inline"><SootBuddy size={64} look={{ bloom: "pink", holdR: "flower-green" }} /><div><strong>Your vocabulary library is empty</strong><p>Add your first word and TV-English will schedule it for review.</p></div><button className="button primary" onClick={openAdd}><Plus size={16} /> Add first word</button></div>;
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
        }) : <div className="empty-table"><SootBuddy size={70} mood="curious" tool="magnifier" look={{ bloom: "yellow" }} /><strong>No vocabulary found</strong><span>Try another search or filter.</span></div>}
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

function StatsView({ words, decks, stats, userId, dailyGoal, todayAnswers }: { userId: string; dailyGoal: number; todayAnswers: number; words: Vocabulary[]; decks: Deck[]; stats: { total: number; mastered: number; due: number; reviewed: number; accuracy: number; mastery: number } }) {
  const levels = [0, 1, 2, 3, 4, 5].map((level) => ({ level, count: words.filter((w) => w.mastery_level === level).length }));
  const max = Math.max(1, ...levels.map((x) => x.count));
  return <>
    <PageHeader eyebrow="INSIGHTS" title="Learning progress" subtitle="See how your vocabulary is moving from new to mastered." />
    <section className="panel heatmap-panel">
      <div className="panel-title"><div><span>LỊCH HỌC</span><h2>Một năm học tập</h2></div></div>
      <ActivityHeatmap userId={userId} goal={dailyGoal} today={todayAnswers} refreshKey={stats.reviewed} />
    </section>
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
