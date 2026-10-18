import { NextResponse } from "next/server";

// Shared plumbing for the routes that ask Gemini for JSON: same-origin check, a small
// per-IP rate limit, and turning Gemini failures into Vietnamese error messages.

const MODEL = "gemini-3.5-flash-lite";
const buckets = new Map<string, Map<string, { count: number; resetAt: number }>>();

function isRateLimited(bucket: string, ip: string, perMinute: number) {
  const now = Date.now();
  let requestsByIp = buckets.get(bucket);
  if (!requestsByIp) buckets.set(bucket, (requestsByIp = new Map()));
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
  return entry.count > perMinute;
}

/** Returns an error response when the request should not reach Gemini, otherwise null. */
export function guardGeminiRequest(request: Request, bucket: string, perMinute: number) {
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
  if (isRateLimited(bucket, ip, perMinute)) {
    return NextResponse.json(
      { error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau một phút." },
      { status: 429 },
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Chưa cấu hình Gemini. Hãy thêm GEMINI_API_KEY vào tệp .env.local rồi khởi động lại ứng dụng." },
      { status: 503 },
    );
  }

  return null;
}

/** Asks Gemini for JSON matching `schema`. Resolves to the parsed object or an error response. */
export async function generateGeminiJson<T>(
  prompt: string,
  schema: unknown,
  temperature = 0.3,
): Promise<{ data: T } | { error: NextResponse }> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY ?? "",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
            temperature,
          },
        }),
        signal: AbortSignal.timeout(25_000),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return { error: NextResponse.json({ error: "Gemini đang giới hạn yêu cầu. Vui lòng đợi một chút rồi thử lại." }, { status: 429 }) };
      }
      if (response.status === 401 || response.status === 403) {
        return { error: NextResponse.json({ error: "Gemini API key không hợp lệ hoặc chưa được cấp quyền." }, { status: 502 }) };
      }
      return { error: NextResponse.json({ error: "Gemini chưa thể tạo gợi ý lúc này. Vui lòng thử lại." }, { status: 502 }) };
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== "string") {
      return { error: NextResponse.json({ error: "Gemini không trả về nội dung hợp lệ." }, { status: 502 }) };
    }

    return { data: JSON.parse(text) as T };
  } catch {
    return { error: NextResponse.json({ error: "Không thể kết nối Gemini lúc này. Vui lòng thử lại." }, { status: 502 }) };
  }
}
