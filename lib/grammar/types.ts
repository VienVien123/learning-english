export type GrammarLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export type GrammarExample = {
  en: string;
  vi: string;
  // Optional short remark shown under the example (Vietnamese).
  note?: string;
};

// One block of a lesson. Every field is optional so a section can be plain text,
// a formula card, a list of examples, a comparison table, or a mix.
export type GrammarSection = {
  heading: string;
  text?: string;
  points?: string[];
  formulas?: { label: string; pattern: string }[];
  examples?: GrammarExample[];
  table?: { head: string[]; rows: string[][] };
};

export type GrammarMistake = {
  wrong: string;
  right: string;
  why: string;
};

export type GrammarExercise =
  | {
      kind: "choice";
      // Use "___" to mark the gap when the question is a sentence.
      question: string;
      options: string[];
      // Index into options.
      answer: number;
      explain: string;
    }
  | {
      kind: "fill";
      // Must contain exactly one "___" gap.
      question: string;
      // Every accepted answer (compared case-insensitively, extra spaces ignored).
      answers: string[];
      // Shown in brackets after the sentence, e.g. the base verb "(go)".
      hint?: string;
      explain: string;
    };

export type GrammarTopic = {
  id: string;
  level: GrammarLevel;
  // Vietnamese title, e.g. "Thì hiện tại đơn".
  title: string;
  // English name, e.g. "Present simple".
  titleEn: string;
  // One or two sentences in Vietnamese: what this lesson teaches.
  summary: string;
  sections: GrammarSection[];
  mistakes: GrammarMistake[];
  exercises: GrammarExercise[];
};
