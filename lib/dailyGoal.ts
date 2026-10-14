"use client";

import { useCallback, useEffect, useState } from "react";
import { DAILY_GOAL } from "./gamification";

// Answers per day the learner aims for; stored per user in this browser.
export const GOAL_OPTIONS = [10, 20, 30, 50];
const CHANGE_EVENT = "tv-english-goal-change";

const keyFor = (userId: string) => `tv-english-daily-goal:${userId}`;

export function useDailyGoal(userId: string) {
  const [goal, setGoalState] = useState(DAILY_GOAL);

  useEffect(() => {
    const sync = () => {
      try {
        const saved = Number(localStorage.getItem(keyFor(userId)));
        setGoalState(GOAL_OPTIONS.includes(saved) ? saved : DAILY_GOAL);
      } catch {
        setGoalState(DAILY_GOAL);
      }
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, [userId]);

  const setGoal = useCallback((next: number) => {
    try { localStorage.setItem(keyFor(userId), String(next)); } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, [userId]);

  return [goal, setGoal] as const;
}
