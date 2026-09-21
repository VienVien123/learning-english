import type { ReviewRating, Vocabulary } from "./types";

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

export function getReviewUpdate(word: Vocabulary, rating: ReviewRating) {
  const now = new Date();
  let newLevel = word.mastery_level;
  let intervalMs = DAY;
  let correct = true;

  if (rating === 0) {
    newLevel = Math.max(0, word.mastery_level - 1);
    intervalMs = 10 * MINUTE;
    correct = false;
  } else if (rating === 1) {
    newLevel = Math.max(1, word.mastery_level);
    intervalMs = DAY;
  } else if (rating === 2) {
    newLevel = Math.min(5, word.mastery_level + 1);
    const days = [1, 2, 4, 7, 14, 30][newLevel] ?? 7;
    intervalMs = days * DAY;
  } else {
    newLevel = Math.min(5, word.mastery_level + 2);
    const days = [2, 4, 7, 14, 30, 60][newLevel] ?? 14;
    intervalMs = days * DAY;
  }

  return {
    previousLevel: word.mastery_level,
    newLevel,
    nextReviewAt: new Date(now.getTime() + intervalMs).toISOString(),
    lastReviewedAt: now.toISOString(),
    reviewCount: word.review_count + 1,
    correctCount: word.correct_count + (correct ? 1 : 0),
    wrongCount: word.wrong_count + (correct ? 0 : 1),
  };
}

export function isDue(word: Vocabulary) {
  if (!word.next_review_at) return true;
  return new Date(word.next_review_at).getTime() <= Date.now();
}

export function masteryLabel(level: number) {
  return ["New", "Learning", "Familiar", "Good", "Strong", "Mastered"][level] ?? "New";
}
