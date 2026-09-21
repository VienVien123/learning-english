"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Sparkles } from "lucide-react";
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

export default function WordModal({
  open,
  decks,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  decks: Deck[];
  initial: Vocabulary | null;
  onClose: () => void;
  onSave: (data: WordDraft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<WordDraft>(EMPTY);
  const [saving, setSaving] = useState(false);
  const title = useMemo(() => (initial ? "Edit vocabulary" : "Add a new word"), [initial]);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setDraft({
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
      });
    } else {
      setDraft({ ...EMPTY, deck_id: decks[0]?.id ?? "" });
    }
  }, [open, initial, decks]);

  if (!open) return null;

  function update<K extends keyof WordDraft>(key: K, value: WordDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.word.trim() || !draft.meaning.trim()) return;
    setSaving(true);
    try {
      await onSave(draft);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="eyebrow"><Sparkles size={14} /> Vocabulary editor</div>
            <h2>{title}</h2>
            <p>Keep it simple. A good example sentence helps memory much more than a long note.</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>

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
            <button type="button" className="button secondary" onClick={onClose}>Cancel</button>
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
