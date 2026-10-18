"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";

export type GrammarRecord = {
  topic_id: string;
  best_score: number;
  last_score: number;
  attempts: number;
  completed_at: string | null;
  updated_at: string;
};

// A practice round at or above this score marks the topic as done.
export const GRAMMAR_PASS_SCORE = 80;

const storageKey = (userId: string) => `lexibloom-grammar:${userId}`;

function readLocal(userId: string): Record<string, GrammarRecord> {
  try {
    return JSON.parse(localStorage.getItem(storageKey(userId)) ?? "{}") ?? {};
  } catch {
    return {};
  }
}

function writeLocal(userId: string, records: Record<string, GrammarRecord>) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(records));
  } catch {}
}

/**
 * Grammar scores per topic. Saved to Supabase (grammar_progress table); until that
 * migration has been run, scores are kept in this browser so nothing is lost.
 */
export function useGrammarProgress(userId: string) {
  const [records, setRecords] = useState<Record<string, GrammarRecord>>({});
  const recordsRef = useRef(records);
  recordsRef.current = records;

  useEffect(() => {
    let cancelled = false;
    const local = readLocal(userId);
    setRecords(local);
    (async () => {
      const { data, error } = await supabase.from("grammar_progress").select("topic_id,best_score,last_score,attempts,completed_at,updated_at").eq("user_id", userId);
      if (cancelled || error) return;
      const merged = { ...local };
      const server = new Map(((data ?? []) as GrammarRecord[]).map((row) => [row.topic_id, row]));
      for (const row of server.values()) {
        const mine = merged[row.topic_id];
        if (!mine || row.best_score >= mine.best_score) merged[row.topic_id] = row;
      }
      setRecords(merged);
      writeLocal(userId, merged);
      // Scores saved in this browser before the table existed go up now.
      const unsynced = Object.values(merged).filter((r) => (server.get(r.topic_id)?.best_score ?? -1) < r.best_score);
      if (unsynced.length) await supabase.from("grammar_progress").upsert(unsynced.map((r) => ({ user_id: userId, ...r })));
    })();
    return () => { cancelled = true; };
  }, [userId]);

  const saveScore = useCallback(async (topicId: string, score: number) => {
    const now = new Date().toISOString();
    const old = recordsRef.current[topicId];
    const next: GrammarRecord = {
      topic_id: topicId,
      best_score: Math.max(old?.best_score ?? 0, score),
      last_score: score,
      attempts: (old?.attempts ?? 0) + 1,
      completed_at: old?.completed_at ?? (score >= GRAMMAR_PASS_SCORE ? now : null),
      updated_at: now,
    };
    const all = { ...recordsRef.current, [topicId]: next };
    recordsRef.current = all;
    setRecords(all);
    writeLocal(userId, all);
    const { error } = await supabase.from("grammar_progress").upsert({ user_id: userId, ...next });
    if (error) console.warn("Grammar progress kept in this browser only:", error.message);
  }, [userId]);

  return { records, saveScore };
}
