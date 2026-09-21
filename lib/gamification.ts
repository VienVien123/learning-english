import type { UserProgress, Vocabulary } from "./types";

export const DAILY_GOAL = 20;

export function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function emptyProgress(userId = ""): UserProgress {
  return {
    user_id: userId,
    total_xp: 0,
    current_streak: 0,
    best_streak: 0,
    last_active_date: null,
    daily_date: null,
    daily_answers: 0,
    daily_correct: 0,
    game_answers: 0,
    game_correct: 0,
    updated_at: new Date(0).toISOString(),
  };
}

export function effectiveDailyAnswers(progress: UserProgress) {
  return progress.daily_date === localDateKey() ? progress.daily_answers : 0;
}

export function effectiveDailyCorrect(progress: UserProgress) {
  return progress.daily_date === localDateKey() ? progress.daily_correct : 0;
}

export function effectiveStreak(progress: UserProgress) {
  if (!progress.last_active_date) return 0;
  const today = new Date(`${localDateKey()}T00:00:00`);
  const last = new Date(`${progress.last_active_date}T00:00:00`);
  const diff = Math.round((today.getTime() - last.getTime()) / 86400000);
  return diff <= 1 ? progress.current_streak : 0;
}

export function levelInfo(totalXp: number) {
  const safeXp = Math.max(0, totalXp);
  const level = Math.floor(Math.sqrt(safeXp / 100)) + 1;
  const currentFloor = (level - 1) ** 2 * 100;
  const nextFloor = level ** 2 * 100;
  return {
    level,
    currentXp: safeXp - currentFloor,
    neededXp: Math.max(1, nextFloor - currentFloor),
    percent: Math.min(100, Math.round(((safeXp - currentFloor) / Math.max(1, nextFloor - currentFloor)) * 100)),
  };
}

export function gameAccuracy(progress: UserProgress) {
  return progress.game_answers ? Math.round((progress.game_correct / progress.game_answers) * 100) : 0;
}

export function getWeakWords(words: Vocabulary[], limit = 6) {
  return [...words]
    .map((word) => {
      const attempts = word.correct_count + word.wrong_count;
      const missRate = attempts ? word.wrong_count / attempts : 0;
      const score = missRate * 8 + word.wrong_count * 1.5 + (5 - word.mastery_level) * 0.9 + (word.next_review_at && new Date(word.next_review_at).getTime() <= Date.now() ? 1.5 : 0);
      return { word, score };
    })
    .filter(({ word, score }) => score > 2 || word.mastery_level <= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ word }) => word);
}
