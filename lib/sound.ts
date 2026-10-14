"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Small sound effects synthesised with the Web Audio API, so no audio files are needed.
 * Word pronunciation (speech.ts) is separate and is not affected by muting.
 */
export type SoundName = "correct" | "wrong" | "flip" | "pop" | "tap" | "combo" | "celebrate";

const MUTE_KEY = "tv-english-muted";
const CHANGE_EVENT = "tv-english-sound-change";

let context: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!context) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  if (context.state === "suspended") void context.resume();
  return context;
}

export function isMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setMuted(muted: boolean) {
  try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useSoundOn() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const sync = () => setOn(!isMuted());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const toggle = useCallback(() => {
    const wasMuted = isMuted();
    setMuted(!wasMuted);
    if (wasMuted) playSound("pop");
  }, []);
  return [on, toggle] as const;
}

type Tone = { freq: number; to?: number; start?: number; dur?: number; type?: OscillatorType; gain?: number };

function tone(c: AudioContext, { freq, to, start = 0, dur = 0.15, type = "sine", gain = 0.16 }: Tone) {
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const env = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

// A short burst of filtered noise, like a card being flicked.
function swish(c: AudioContext, dur = 0.14, gain = 0.12) {
  const t = c.currentTime;
  const buffer = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = c.createBufferSource();
  const filter = c.createBiquadFilter();
  const env = c.createGain();
  src.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(900, t);
  filter.frequency.exponentialRampToValueAtTime(3200, t + dur);
  env.gain.setValueAtTime(gain, t);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(env).connect(c.destination);
  src.start(t);
}

export function playSound(name: SoundName) {
  if (isMuted()) return;
  const c = audio();
  if (!c) return;
  switch (name) {
    case "correct":
      tone(c, { freq: 784, dur: 0.12, type: "triangle" });
      tone(c, { freq: 1175, start: 0.09, dur: 0.24, type: "triangle" });
      break;
    case "wrong":
      tone(c, { freq: 233, to: 175, dur: 0.2, type: "square", gain: 0.06 });
      tone(c, { freq: 175, to: 123, start: 0.12, dur: 0.26, type: "square", gain: 0.055 });
      break;
    case "flip":
      swish(c);
      break;
    case "pop":
      tone(c, { freq: 380, to: 900, dur: 0.11, gain: 0.14 });
      break;
    case "tap":
      tone(c, { freq: 660, dur: 0.05, gain: 0.05 });
      break;
    case "combo":
      [659, 880, 1175, 1568].forEach((freq, i) => tone(c, { freq, start: i * 0.055, dur: 0.14, type: "triangle", gain: 0.11 }));
      break;
    case "celebrate":
      [523, 659, 784, 1047].forEach((freq, i) => tone(c, { freq, start: i * 0.09, dur: i === 3 ? 0.45 : 0.22, type: "triangle", gain: 0.13 }));
      break;
  }
}
