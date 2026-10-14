"use client";

/**
 * Pronounce an English vocabulary item using the browser's built-in
 * SpeechSynthesis API. No external API or key is required.
 * Returns the utterance, or null when speech is unavailable.
 */
export function speakEnglish(text: string, rate = 0.88) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const clean = text.trim();
  if (!clean) return null;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;

  // Prefer a natural US English voice when the browser exposes one.
  const voices = synth.getVoices();
  const preferred =
    voices.find((voice) => /en-US/i.test(voice.lang) && /Google|Microsoft|Samantha|Natural/i.test(voice.name)) ||
    voices.find((voice) => /en-US/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang));

  if (preferred) utterance.voice = preferred;
  synth.speak(utterance);
  return utterance;
}

/**
 * Like speakEnglish, but resolves once the word has been spoken.
 * Some browsers never fire `end`, so a length-based timeout resolves it as a fallback.
 */
export function speakEnglishAndWait(text: string, rate = 0.88) {
  return new Promise<void>((resolve) => {
    const utterance = speakEnglish(text, rate);
    if (!utterance) {
      resolve();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(fallback);
      resolve();
    };
    const fallback = window.setTimeout(finish, Math.min(4000, 900 + text.trim().length * 110));
    utterance.addEventListener("end", finish);
    utterance.addEventListener("error", finish);
  });
}
