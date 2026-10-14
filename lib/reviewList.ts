"use client";

import { useCallback, useEffect, useState } from "react";

// The "Cần ôn" list: ids of words the learner marked as not learned yet.
// Flashcards and lessons share it through localStorage; a window event keeps
// every mounted view in sync.
const CHANGE_EVENT = "tv-english-review-change";

export function reviewKeyFor(userId: string) {
  return `tv-english-review:${userId}`;
}

export function readReviewIds(key: string): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function updateReviewIds(key: string, fn: (ids: string[]) => string[]) {
  const next = fn(readReviewIds(key));
  try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
}

export const addReviewId = (key: string, id: string) => updateReviewIds(key, (ids) => (ids.includes(id) ? ids : [...ids, id]));
export const removeReviewId = (key: string, id: string) => updateReviewIds(key, (ids) => ids.filter((x) => x !== id));

export function useReviewIds(key: string) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(readReviewIds(key));
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);

  const update = useCallback((fn: (ids: string[]) => string[]) => updateReviewIds(key, fn), [key]);
  return [ids, update] as const;
}
