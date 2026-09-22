"use client";

/**
 * Pronounce an English vocabulary item using the browser's built-in
 * SpeechSynthesis API. No external API or key is required.
 */
export function speakEnglish(text: string, rate = 0.88) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const clean = text.trim();
  if (!clean) return;

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
}
