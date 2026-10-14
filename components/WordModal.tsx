"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, LoaderCircle, Sparkles, X } from "lucide-react";
import type { Deck, Vocabulary } from "@/lib/types";

type WordDraft = {
  word: string;
  meaning: string;
  pronunciation: string;
  part_of_speech: string;
  example: string;
  example_translation: string;
  note: string;
  tags: string;
  synonyms: string;
  antonyms: string;
  deck_id: string;
};

const EMPTY: WordDraft = {
  word: "",
  meaning: "",
  pronunciation: "",
  part_of_speech: "",
  example: "",
  example_translation: "",
  note: "",
  tags: "",
  synonyms: "",
  antonyms: "",
  deck_id: "",
};

type SavedDraft = {
  version: 1;
  savedAt: string;
  draft: WordDraft;
};

function vocabularyToDraft(initial: Vocabulary): WordDraft {
  return {
    word: initial.word,
    meaning: initial.meaning,
    pronunciation: initial.pronunciation ?? "",
    part_of_speech: initial.part_of_speech ?? "",
    example: initial.example ?? "",
    example_translation: initial.example_translation ?? "",
    note: initial.note ?? "",
    tags: initial.tags?.join(", ") ?? "",
    synonyms: initial.synonyms?.join(", ") ?? "",
    antonyms: initial.antonyms?.join(", ") ?? "",
    deck_id: initial.deck_id ?? "",
  };
}

function readSavedDraft(key: string): WordDraft | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedDraft | WordDraft;
    if (parsed && typeof parsed === "object" && "draft" in parsed) {
      return parsed.draft;
    }
    return parsed as WordDraft;
  } catch {
    return null;
  }
}

export default function WordModal({
  open,
  decks,
  initial,
  draftStorageKey,
  onClose,
  onSave,
}: {
  open: boolean;
  decks: Deck[];
  initial: Vocabulary | null;
  /**
   * Nên chứa user id để bản nháp của các tài khoản không dùng chung.
   * Ví dụ: lexibloom-word-draft:USER_ID
   */
  draftStorageKey?: string;
  onClose: () => void;
  onSave: (data: WordDraft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<WordDraft>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationMessage, setGenerationMessage] = useState("");
  const currentDraftRef = useRef<WordDraft>(EMPTY);
  const generationRequestRef = useRef(0);
  // Values Gemini last wrote into each field, so a new suggestion can replace them
  // (e.g. after the word changes) without touching anything the user typed.
  const aiFilledRef = useRef<Partial<WordDraft>>({});

  const title = useMemo(() => (initial ? "Edit vocabulary" : "Add a new word"), [initial]);
  const actualStorageKey = useMemo(() => {
    const base = draftStorageKey ?? "lexibloom-word-draft";
    return `${base}:${initial?.id ?? "new"}`;
  }, [draftStorageKey, initial?.id]);

  // Khởi tạo form CHỈ khi modal mở hoặc đổi sang một từ khác.
  // Không phụ thuộc toàn bộ `decks`, vì Realtime cập nhật decks trước đây
  // có thể vô tình reset nội dung người dùng đang gõ.
  useEffect(() => {
    if (!open) {
      setDraftReady(false);
      setRestored(false);
      return;
    }

    setDraftReady(false);
    aiFilledRef.current = {};

    const saved = readSavedDraft(actualStorageKey);
    if (saved) {
      setDraft(saved);
      currentDraftRef.current = saved;
      setRestored(true);
      setDraftReady(true);
      return;
    }

    const next = initial
      ? vocabularyToDraft(initial)
      : { ...EMPTY, deck_id: decks[0]?.id ?? "" };

    setDraft(next);
    currentDraftRef.current = next;
    setRestored(false);
    setDraftReady(true);
    // decks[0]?.id chỉ dùng làm default tại thời điểm mở modal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial?.id, actualStorageKey]);

  // Autosave sau mỗi thay đổi của form.
  useEffect(() => {
    currentDraftRef.current = draft;
    if (!open || !draftReady) return;

    try {
      const payload: SavedDraft = {
        version: 1,
        savedAt: new Date().toISOString(),
        draft,
      };
      localStorage.setItem(actualStorageKey, JSON.stringify(payload));
    } catch {
      // localStorage có thể bị vô hiệu hóa trong một số chế độ riêng tư.
      // Không để lỗi autosave làm hỏng form chính.
    }
  }, [draft, open, draftReady, actualStorageKey]);

  useEffect(() => {
    if (!open || initial || !draftReady || !draft.word.trim()) return;

    const timer = window.setTimeout(() => {
      void generateSuggestions(false);
    }, 900);
    return () => window.clearTimeout(timer);
    // Only the word controls automatic generation. Other edits must not trigger another request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.word, open, initial, draftReady]);

  // Khi browser đưa tab xuống background/discard, ghi bản nháp lần cuối ngay lập tức.
  useEffect(() => {
    if (!open || !draftReady) return;

    const persistNow = () => {
      try {
        const payload: SavedDraft = {
          version: 1,
          savedAt: new Date().toISOString(),
          draft: currentDraftRef.current,
        };
        localStorage.setItem(actualStorageKey, JSON.stringify(payload));
      } catch {}
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") persistNow();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", persistNow);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", persistNow);
    };
  }, [open, draftReady, actualStorageKey]);

  if (!open) return null;

  function update<K extends keyof WordDraft>(key: K, value: WordDraft[K]) {
    if (key === "word") {
      generationRequestRef.current += 1;
      setGenerating(false);
    }
    setDraft((prev) => ({ ...prev, [key]: value }));
    if (key === "word") setGenerationMessage("");
  }

  async function generateSuggestions(overwrite: boolean) {
    const word = currentDraftRef.current.word.trim();
    if (!word || generating) return;

    const requestId = ++generationRequestRef.current;
    setGenerating(true);
    setGenerationMessage("");

    try {
      const response = await fetch("/api/vocabulary/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Không thể tạo gợi ý lúc này.");
      if (requestId !== generationRequestRef.current) return;

      const suggestion = result.suggestion as Partial<WordDraft> & {
        tags?: string[];
        synonyms?: string[];
        antonyms?: string[];
      };
      const generated: Partial<WordDraft> = {
        meaning: suggestion.meaning ?? "",
        pronunciation: suggestion.pronunciation ?? "",
        part_of_speech: suggestion.part_of_speech ?? "",
        example: suggestion.example ?? "",
        example_translation: suggestion.example_translation ?? "",
        note: suggestion.note ?? "",
        tags: Array.isArray(suggestion.tags) ? suggestion.tags.join(", ") : "",
        synonyms: Array.isArray(suggestion.synonyms) ? suggestion.synonyms.join(", ") : "",
        antonyms: Array.isArray(suggestion.antonyms) ? suggestion.antonyms.join(", ") : "",
      };

      // Fill a field if asked to overwrite, if it is empty, or if it still holds
      // an earlier AI value the user hasn't edited.
      const current = currentDraftRef.current;
      const filled = aiFilledRef.current;
      const updates: Partial<WordDraft> = {};
      (Object.keys(generated) as Array<keyof WordDraft>).forEach((key) => {
        const value = current[key];
        if (overwrite || !value.trim() || value === filled[key]) updates[key] = generated[key] ?? "";
      });
      aiFilledRef.current = { ...filled, ...updates };
      setDraft((prev) => ({ ...prev, ...updates }));
      setGenerationMessage("Đã điền gợi ý. Bạn có thể chỉnh sửa các trường trước khi lưu.");
    } catch (error) {
      if (requestId === generationRequestRef.current) {
        setGenerationMessage(error instanceof Error ? error.message : "Không thể tạo gợi ý lúc này.");
      }
    } finally {
      if (requestId === generationRequestRef.current) setGenerating(false);
    }
  }

  function clearSavedDraft() {
    try {
      localStorage.removeItem(actualStorageKey);
    } catch {}
  }

  function discardAndClose() {
    generationRequestRef.current += 1;
    setGenerating(false);
    clearSavedDraft();
    setRestored(false);
    onClose();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.word.trim() || !draft.meaning.trim()) return;

    generationRequestRef.current += 1;
    setGenerating(false);
    setSaving(true);
    try {
      await onSave(draft);
      // Chỉ xóa draft SAU KHI Supabase lưu thành công.
      clearSavedDraft();
      setRestored(false);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={discardAndClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="eyebrow"><Sparkles size={14} /> Vocabulary editor</div>
            <h2>{title}</h2>
            <p>
              {restored
                ? "Bản nháp trước đó đã được khôi phục. Nội dung đang nhập được tự động lưu trên thiết bị này."
                : "Nội dung đang nhập được tự động lưu, nên bạn có thể chuyển tab mà không sợ mất."}
            </p>
          </div>
          <button className="icon-btn" onClick={discardAndClose} aria-label="Close"><X size={20} /></button>
        </div>

        {restored && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13, opacity: 0.8 }}>
            <Check size={15} /> Đã khôi phục bản nháp chưa hoàn thành
          </div>
        )}

        <form className="word-form" onSubmit={submit}>
          <div className="form-grid two">
            <label>
              <span>Word *</span>
              <input autoFocus value={draft.word} onChange={(e) => update("word", e.target.value)} placeholder="serendipity" />
            </label>
            <label>
              <span>Meaning *</span>
              <input value={draft.meaning} onChange={(e) => update("meaning", e.target.value)} placeholder="sự tình cờ may mắn" />
            </label>
          </div>

          {!initial && (
            <div className="ai-fill-row">
              <div className={`ai-fill-message ${generationMessage.startsWith("Đã điền") ? "success" : ""}`} aria-live="polite">
                {generating ? <><LoaderCircle size={15} className="spin" /> Gemini đang điền thông tin…</> : generationMessage}
              </div>
              <button type="button" className="button secondary ai-fill-button" onClick={() => void generateSuggestions(true)} disabled={generating || !draft.word.trim()}>
                <Sparkles size={15} /> {generating ? "Đang tạo…" : "Tạo gợi ý"}
              </button>
            </div>
          )}

          <div className="form-grid three">
            <label>
              <span>Pronunciation</span>
              <input value={draft.pronunciation} onChange={(e) => update("pronunciation", e.target.value)} placeholder="/ˌser.ənˈdɪp.ə.ti/" />
            </label>
            <label>
              <span>Part of speech</span>
              <select value={draft.part_of_speech} onChange={(e) => update("part_of_speech", e.target.value)}>
                <option value="">— Select —</option>
                <option>noun</option><option>verb</option><option>adjective</option><option>adverb</option>
                <option>phrase</option><option>idiom</option><option>other</option>
              </select>
            </label>
            <label>
              <span>Deck</span>
              <select value={draft.deck_id} onChange={(e) => update("deck_id", e.target.value)}>
                <option value="">No deck</option>
                {decks.map((deck) => <option key={deck.id} value={deck.id}>{deck.icon} {deck.name}</option>)}
              </select>
            </label>
          </div>

          <label>
            <span>Example sentence</span>
            <textarea rows={2} value={draft.example} onChange={(e) => update("example", e.target.value)} placeholder="Meeting her was pure serendipity." />
          </label>

          <label>
            <span>Example translation</span>
            <textarea rows={2} value={draft.example_translation} onChange={(e) => update("example_translation", e.target.value)} placeholder="Gặp cô ấy hoàn toàn là một sự tình cờ may mắn." />
          </label>

          <div className="form-grid three">
            <label>
              <span>Tags</span>
              <input value={draft.tags} onChange={(e) => update("tags", e.target.value)} placeholder="IELTS, B2" />
            </label>
            <label>
              <span>Synonyms</span>
              <input value={draft.synonyms} onChange={(e) => update("synonyms", e.target.value)} placeholder="chance, luck" />
            </label>
            <label>
              <span>Antonyms</span>
              <input value={draft.antonyms} onChange={(e) => update("antonyms", e.target.value)} placeholder="misfortune" />
            </label>
          </div>

          <label>
            <span>Personal note</span>
            <textarea rows={2} value={draft.note} onChange={(e) => update("note", e.target.value)} placeholder="Something I want to remember..." />
          </label>

          <div className="modal-actions">
            <button type="button" className="button secondary" onClick={discardAndClose}>Cancel</button>
            <button type="submit" className="button primary" disabled={saving || !draft.word.trim() || !draft.meaning.trim()}>
              {saving ? "Saving..." : initial ? "Save changes" : "Add vocabulary"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type { WordDraft };
