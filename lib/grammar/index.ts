import type { GrammarLevel, GrammarTopic } from "./types";
import { A1_TOPICS } from "./a1";
import { A2_TOPICS } from "./a2";
import { B1_TOPICS } from "./b1";
import { B2_TOPICS } from "./b2";
import { C1_TOPICS } from "./c1";

export type { GrammarExercise, GrammarLevel, GrammarTopic } from "./types";

export const GRAMMAR_LEVELS: { level: GrammarLevel; name: string; blurb: string }[] = [
  { level: "A1", name: "Nền tảng", blurb: "To be, các thì hiện tại, mạo từ, giới từ, câu hỏi" },
  { level: "A2", name: "Sơ cấp", blurb: "Quá khứ, tương lai, so sánh, động từ khuyết thiếu" },
  { level: "B1", name: "Trung cấp", blurb: "Hoàn thành, bị động, câu điều kiện, mệnh đề quan hệ" },
  { level: "B2", name: "Trên trung cấp", blurb: "Điều kiện loại 3, wish, modal perfect, từ nối" },
  { level: "C1", name: "Nâng cao", blurb: "Đảo ngữ, câu chẻ, giả định cách, văn phong học thuật" },
];

export const GRAMMAR_TOPICS: GrammarTopic[] = [...A1_TOPICS, ...A2_TOPICS, ...B1_TOPICS, ...B2_TOPICS, ...C1_TOPICS];

export function grammarTopic(id: string) {
  return GRAMMAR_TOPICS.find((topic) => topic.id === id) ?? null;
}

// Lenient comparison for typed answers: case, spacing, curly apostrophes and a final full stop don't matter.
export function normalizeAnswer(value: string) {
  return value.toLowerCase().replace(/[’‘`]/g, "'").replace(/[.!?]+$/, "").replace(/\s+/g, " ").trim();
}

export function isFillCorrect(input: string, answers: string[]) {
  const given = normalizeAnswer(input);
  return answers.some((answer) => normalizeAnswer(answer) === given);
}
