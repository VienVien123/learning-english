"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type DeckDraft = { name: string; description: string; icon: string; color: string };

export default function DeckModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: DeckDraft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<DeckDraft>({ name: "", description: "", icon: "📚", color: "#6d5dfc" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setDraft({ name: "", description: "", icon: "📚", color: "#6d5dfc" });
  }, [open]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name.trim()) return;
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
      <div className="modal-card small" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div><div className="eyebrow">Collection</div><h2>Create a new deck</h2><p>Group words by goal, class, topic or exam.</p></div>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <form className="word-form" onSubmit={submit}>
          <div className="form-grid icon-name">
            <label><span>Icon</span><input className="emoji-input" value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} /></label>
            <label><span>Deck name *</span><input autoFocus value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="IELTS Academic" /></label>
          </div>
          <label><span>Description</span><textarea rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Words I want to master for IELTS..." /></label>
          <label><span>Accent color</span><input type="color" className="color-input" value={draft.color} onChange={(e) => setDraft({ ...draft, color: e.target.value })} /></label>
          <div className="modal-actions">
            <button type="button" className="button secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="button primary" disabled={saving || !draft.name.trim()}>{saving ? "Creating..." : "Create deck"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
