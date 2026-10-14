import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = "gemini-3.5-flash-lite";
const MAX_WORD_LENGTH = 120;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

const vocabularySchema = {
  type: "OBJECT",
  properties: {
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

function isRateLimited(ip: string) {
  const now = Date.now();
  if (requestsByIp.size > 1_000) {
    for (const [key, value] of requestsByIp) {
      if (value.resetAt <= now) requestsByIp.delete(key);
    }
  }
  const entry = requestsByIp.get(ip);

  if (!entry || entry.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count += 1;
  return entry.count > 12;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host.toLowerCase();
    } catch {
      return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
    }

    const requestUrl = new URL(request.url);
    const allowedHosts = [
      request.headers.get("host"),
      request.headers.get("x-forwarded-host")?.split(",")[0].trim(),
      requestUrl.host,
    ]
      .filter((host): host is string => Boolean(host))
      .map((host) => host.toLowerCase());

    if (!allowedHosts.includes(originHost)) {
      return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
    }
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau một phút." },
      { status: 429 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chưa cấu hình Gemini. Hãy thêm GEMINI_API_KEY vào tệp .env.local rồi khởi động lại ứng dụng." },
      { status: 503 },
    );
  }

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

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: vocabularySchema,
            temperature: 0.3,
          },
        }),
        signal: AbortSignal.timeout(25_000),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Gemini đang giới hạn yêu cầu. Vui lòng đợi một chút rồi thử lại." },
          { status: 429 },
        );
      }
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: "Gemini API key không hợp lệ hoặc chưa được cấp quyền." },
          { status: 502 },
        );
      }
      return NextResponse.json(
        { error: "Gemini chưa thể tạo gợi ý lúc này. Vui lòng thử lại." },
        { status: 502 },
      );
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== "string") {
      return NextResponse.json({ error: "Gemini không trả về nội dung hợp lệ." }, { status: 502 });
    }

    const suggestion = JSON.parse(text);
    return NextResponse.json({ suggestion });
  } catch {
    return NextResponse.json(
      { error: "Không thể kết nối Gemini lúc này. Vui lòng thử lại." },
      { status: 502 },
    );
  }
}
