import { NextResponse } from "next/server";
import { generateGeminiJson, guardGeminiRequest } from "@/lib/server/gemini";
import { grammarTopic, type GrammarExercise, type GrammarTopic } from "@/lib/grammar";

export const runtime = "nodejs";

const EXERCISE_COUNT = 6;
const MAX_SENTENCE_LENGTH = 300;

const exercisesSchema = {
  type: "OBJECT",
  properties: {
    exercises: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          kind: { type: "STRING", enum: ["choice", "fill"] },
          question: { type: "STRING" },
          options: { type: "ARRAY", items: { type: "STRING" } },
          answer: { type: "INTEGER" },
          answers: { type: "ARRAY", items: { type: "STRING" } },
          hint: { type: "STRING" },
          explain: { type: "STRING" },
        },
        required: ["kind", "question", "options", "answer", "answers", "hint", "explain"],
      },
    },
  },
  required: ["exercises"],
} as const;

const checkSchema = {
  type: "OBJECT",
  properties: {
    correct: { type: "BOOLEAN" },
    uses_structure: { type: "BOOLEAN" },
    corrected: { type: "STRING" },
    feedback: { type: "STRING" },
    better: { type: "STRING" },
  },
  required: ["correct", "uses_structure", "corrected", "feedback", "better"],
} as const;

type RawExercise = { kind: string; question: string; options: string[]; answer: number; answers: string[]; hint: string; explain: string };

// What the model needs to know about the lesson, kept short.
function topicBrief(topic: GrammarTopic) {
  const formulas = topic.sections.flatMap((s) => s.formulas ?? []).map((f) => `${f.label}: ${f.pattern}`).slice(0, 12);
  return `Grammar topic (CEFR ${topic.level}): ${topic.titleEn} — "${topic.title}".
Lesson summary (Vietnamese): ${topic.summary}
Key forms: ${formulas.join(" | ") || "see topic name"}`;
}

// Drop anything the UI could not grade reliably.
function cleanExercises(raw: RawExercise[]): GrammarExercise[] {
  const out: GrammarExercise[] = [];
  for (const item of raw) {
    const question = item.question?.trim();
    const explain = item.explain?.trim();
    if (!question || !explain) continue;
    if (item.kind === "choice") {
      const options = (item.options ?? []).map((o) => o.trim()).filter(Boolean);
      if (options.length < 3 || options.length > 4 || new Set(options).size !== options.length) continue;
      if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= options.length) continue;
      out.push({ kind: "choice", question, options, answer: item.answer, explain });
    } else if (item.kind === "fill") {
      const answers = (item.answers ?? []).map((a) => a.trim()).filter(Boolean);
      if (!answers.length || question.split("___").length !== 2) continue;
      out.push({ kind: "fill", question, answers, hint: item.hint?.trim() || undefined, explain });
    }
  }
  return out;
}

export async function POST(request: Request) {
  const blocked = guardGeminiRequest(request, "grammar", 10);
  if (blocked) return blocked;

  let body: { mode?: unknown; topicId?: unknown; sentence?: unknown; avoid?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const topic = typeof body.topicId === "string" ? grammarTopic(body.topicId) : null;
  if (!topic) {
    return NextResponse.json({ error: "Không tìm thấy chủ điểm ngữ pháp." }, { status: 400 });
  }

  if (body.mode === "exercises") {
    const avoid = Array.isArray(body.avoid)
      ? body.avoid.filter((q): q is string => typeof q === "string").slice(0, 40).map((q) => q.slice(0, 200))
      : [];

    const prompt = `${topicBrief(topic)}

Write ${EXERCISE_COUNT} NEW practice exercises on exactly this grammar point for a Vietnamese-speaking learner at CEFR ${topic.level}.
Rules:
- Mix: about two thirds "choice", the rest "fill". Vary difficulty from easy to harder.
- Use natural, everyday English sentences that are 100% grammatically correct once the gap is filled.
- Mark the gap with exactly one "___" in "question".
- "choice": 3 or 4 short options in "options"; "answer" is the 0-based index of the ONLY correct option. Double-check that no other option is also acceptable in that sentence. Put the correct option at varied positions. Leave "answers" empty and "hint" as "".
- "fill": "answers" lists every acceptable answer (include contracted and full forms, e.g. "doesn't work" and "does not work"); the context must force one tense/form. "hint" is the base word(s) to transform, without brackets. Set "options" to [] and "answer" to 0.
- "explain": 1–2 sentences in Vietnamese (with full diacritics) explaining why the answer is correct.
- Do not repeat or closely copy these existing questions:
${avoid.map((q) => `  - ${q}`).join("\n") || "  (none)"}
Do not include markdown.`;

    const result = await generateGeminiJson<{ exercises: RawExercise[] }>(prompt, exercisesSchema, 0.7);
    if ("error" in result) return result.error;
    const exercises = cleanExercises(result.data.exercises ?? []);
    if (!exercises.length) {
      return NextResponse.json({ error: "Gemini chưa tạo được câu hỏi hợp lệ. Vui lòng thử lại." }, { status: 502 });
    }
    return NextResponse.json({ exercises });
  }

  if (body.mode === "check") {
    const sentence = typeof body.sentence === "string" ? body.sentence.trim() : "";
    if (!sentence || sentence.length > MAX_SENTENCE_LENGTH) {
      return NextResponse.json({ error: `Hãy viết một câu tiếng Anh tối đa ${MAX_SENTENCE_LENGTH} ký tự.` }, { status: 400 });
    }

    const prompt = `${topicBrief(topic)}

A Vietnamese-speaking learner wrote this English sentence to practise the grammar point above:
"""${sentence}"""
Act as a kind, precise English teacher.
- correct: true only if the sentence is grammatically correct and natural (ignore a missing final full stop or capital letter).
- uses_structure: true if the sentence actually uses the grammar point of this lesson.
- corrected: the corrected sentence (same meaning, minimal changes); repeat the sentence unchanged if it is already correct.
- feedback: 1–3 short sentences in Vietnamese (full diacritics): what is right, what was wrong and why, referring to the rule. If uses_structure is false, say so and how to include the structure.
- better: one more natural or more advanced English version using this grammar point; "" if not needed.
Do not include markdown.`;

    const result = await generateGeminiJson<{ correct: boolean; uses_structure: boolean; corrected: string; feedback: string; better: string }>(prompt, checkSchema, 0.2);
    if ("error" in result) return result.error;
    return NextResponse.json({ check: result.data });
  }

  return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
}
