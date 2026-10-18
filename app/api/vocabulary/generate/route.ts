import { NextResponse } from "next/server";
import { generateGeminiJson, guardGeminiRequest } from "@/lib/server/gemini";

export const runtime = "nodejs";

const MAX_WORD_LENGTH = 120;

const vocabularySchema = {
  type: "OBJECT",
  properties: {
    spelling_ok: { type: "BOOLEAN" },
    corrected_word: { type: "STRING" },
    meaning: { type: "STRING" },
    pronunciation: { type: "STRING" },
    part_of_speech: { type: "STRING" },
    example: { type: "STRING" },
    example_translation: { type: "STRING" },
    note: { type: "STRING" },
    tags: { type: "ARRAY", items: { type: "STRING" } },
    synonyms: { type: "ARRAY", items: { type: "STRING" } },
    antonyms: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: [
    "spelling_ok",
    "corrected_word",
    "meaning",
    "pronunciation",
    "part_of_speech",
    "example",
    "example_translation",
    "note",
    "tags",
    "synonyms",
    "antonyms",
  ],
} as const;

export async function POST(request: Request) {
  const blocked = guardGeminiRequest(request, "vocabulary", 12);
  if (blocked) return blocked;

  let word: unknown;
  try {
    ({ word } = await request.json());
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  if (typeof word !== "string" || !word.trim() || word.trim().length > MAX_WORD_LENGTH) {
    return NextResponse.json(
      { error: `Hãy nhập một từ hoặc cụm từ tối đa ${MAX_WORD_LENGTH} ký tự.` },
      { status: 400 },
    );
  }

  const prompt = `Create a vocabulary entry for the English word or phrase: "${word.trim()}".
First check the spelling:
- spelling_ok: true if it is a correctly spelled English word or phrase (including proper capitalisation-insensitive variants and valid British/American spellings), otherwise false.
- corrected_word: when spelling_ok is false, the single most likely intended English word or phrase (keep the learner's casing style, lowercase if unsure); when spelling_ok is true, repeat the input unchanged.
Then write every other field for corrected_word (the intended word), not for the misspelling.
Return accurate, concise learning content for a Vietnamese-speaking English learner.
- meaning: Vietnamese meaning; include the main sense, not a long explanation.
- pronunciation: IPA pronunciation in a standard British or American form.
- part_of_speech: one of noun, verb, adjective, adverb, phrase, idiom, or other.
- example: one natural English example sentence using this word.
- example_translation: natural Vietnamese translation of that sentence.
- note: a short useful usage or memory note in Vietnamese; use an empty string if none is needed.
- tags: up to 3 short topic or level tags.
- synonyms and antonyms: up to 4 useful English words each; return an empty array when none are appropriate.
Do not translate the word itself into another English word. Do not include markdown.`;

  const result = await generateGeminiJson(prompt, vocabularySchema);
  if ("error" in result) return result.error;
  return NextResponse.json({ suggestion: result.data });
}
