"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { restartClass, SootSprite, type Look, type Tool } from "./Soot";
import { playSound } from "@/lib/sound";

type Focus = "none" | "text" | "password";
type Mood = "idle" | "watching" | "curious" | "shy" | "busy" | "error" | "happy" | "celebrate";

type Props = {
  passwordVisible: boolean;
  busy: boolean;
  error: string;
  sign?: string;
  notice: string;
  celebrate?: boolean;
  children: ReactNode;
};

type Sprite = { x: number; size: number; delay: number; bubble?: boolean; look: Look; tool: Tool };

// x is a percentage across the card's top edge, size is in px.
const SPRITES: Sprite[] = [
  { x: 10, size: 62, delay: -0.4, look: { bloom: "green" }, tool: "magnifier" },
  { x: 28, size: 88, delay: -1.6, bubble: true, look: { hat: true, holdR: "star-yellow" }, tool: "binoculars" },
  { x: 50, size: 108, delay: -0.9, look: { bloom: "pink", holdL: "star-pink", holdR: "flower-yellow" }, tool: "magnifier" },
  { x: 71, size: 82, delay: -2.3, bubble: true, look: { bloom: "yellow", holdL: "flower-green" }, tool: "spyglass" },
  { x: 89, size: 60, delay: -1.2, look: { hat: true }, tool: "binoculars" },
];

// Signs the side sprites hold up on an error; the middle one shows the actual problem.
const SIDE_SIGNS = ["Oops!", "Sai!", "", "Wrong!", "✕"];

// The order in which sprites hop while the learner types a password.
const HOP_ORDER = [2, 0, 3, 1, 4, 2, 4, 1, 3, 0];

// Background crowd scattered on a jittered grid. Integer-only randomness keeps
// server and client renders identical.
const LOOKS: Look[] = [
  { bloom: "pink" },
  {},
  { hat: true },
  { bloom: "yellow", holdR: "star-pink" },
  { holdL: "star-yellow" },
  { bloom: "green", holdL: "flower-pink" },
  {},
  { hat: true, holdR: "flower-yellow" },
];

// `runner` sprites wait off-screen and only rush in while a password is typed.
type Dust = { left: number; top: number; size: number; wideOnly: boolean; runner: boolean; look: Look };
const DUST: Dust[] = (() => {
  let state = 7;
  const rand = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  const cols = 8;
  const rows = 5;
  const list: Dust[] = [];
  for (let i = 0; i < cols * rows; i++) {
    const left = Math.round(((i % cols) + 0.15 + rand() * 0.7) * (100 / cols));
    const top = Math.round((Math.floor(i / cols) + 0.15 + rand() * 0.7) * (100 / rows));
    const r = rand();
    const size = 14 + Math.round(r * r * 32);
    if (left < 26 && top < 12) continue; // keep the brand clear
    list.push({ left, top, size, wideOnly: top < 14, runner: false, look: LOOKS[i % LOOKS.length] });
  }
  for (let i = 0; i < 6; i++) {
    const left = i % 2 ? 106 : -6;
    const top = Math.round(14 + (i / 5) * 72);
    const size = 18 + Math.round(rand() * 22);
    list.push({ left, top, size, wideOnly: false, runner: true, look: LOOKS[(i + 3) % LOOKS.length] });
  }
  return list;
})();

// Confetti burst for a successful sign-in, spread on a golden-angle spiral.
const CONFETTI_COLORS = ["#f6c453", "#ef8fa6", "#7fc8a9", "#82ade8", "#b7a6ff", "#ffb36b"];
const CONFETTI = Array.from({ length: 48 }, (_, i) => {
  const angle = (i * 137.5 * Math.PI) / 180;
  const dist = 190 + ((i * 47) % 280);
  return {
    tx: Math.round(Math.cos(angle) * dist),
    ty: Math.round(Math.sin(angle) * dist * 0.8 - 90),
    rot: ((i * 97) % 720) - 360,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    shape: (["rect", "dot", "star", "flower"] as const)[i % 4],
    delay: (i % 8) * 30,
  };
});

const CHIPS = ["curious", "peek", "shy", "secret", "whisper", "sneaky", "wonder", "giggle"];

const REPEL_RADIUS = 150;
const REPEL_PUSH = 70;

function isAuthInput(el: Element | null): el is HTMLInputElement {
  return el instanceof HTMLInputElement && !!el.closest(".auth-card");
}

function isPasswordField(input: HTMLInputElement) {
  return (input.getAttribute("autocomplete") ?? "").includes("password");
}

let measureCanvas: HTMLCanvasElement | null = null;

// Approximate on-screen position of the caret so the eyes can follow the text.
function caretPoint(input: HTMLInputElement) {
  const rect = input.getBoundingClientRect();
  const style = getComputedStyle(input);
  measureCanvas ??= document.createElement("canvas");
  const ctx = measureCanvas.getContext("2d");
  const typed = input.value.slice(0, input.selectionStart ?? input.value.length);
  const shown = input.type === "password" ? "•".repeat(typed.length) : typed;
  let width = shown.length * 7;
  if (ctx) {
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    width = ctx.measureText(shown).width;
  }
  return {
    x: rect.left + Math.min(width, rect.width),
    y: rect.top + rect.height / 2,
  };
}

// Make a background sprite hop; it comes into focus for the length of the jump.
function hopDust(dust: HTMLElement | null | undefined) {
  const jump = dust?.querySelector(".dust-jump");
  if (!jump) return;
  restartClass(jump, "hop");
  window.setTimeout(() => jump.classList.remove("hop"), 700);
}

function speak(word: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function AuthMascots({ passwordVisible, busy, error, sign = "", notice, celebrate = false, children }: Props) {
  const [focus, setFocus] = useState<Focus>("none");
  const [errorFlash, setErrorFlash] = useState(false);
  const [happyFlash, setHappyFlash] = useState(false);
  const spriteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dustRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const backdropRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef(0);
  const hopCount = useRef(0);

  const hop = useCallback((index: number, cls = "hop") => {
    restartClass(bobRefs.current[index], cls);
  }, []);

  useEffect(() => {
    const update = () => {
      frame.current = 0;
      const active = document.activeElement;
      const target = isAuthInput(active) ? caretPoint(active) : pointer.current;
      const mouse = pointer.current;

      // Read every rect first, then write, so the browser lays out only once.
      const sprites = spriteRefs.current.map((el) => (el ? { el, rect: el.getBoundingClientRect() } : null));
      // Measure the gather layer: it moves with the crowd but not with the repel offset.
      const dust = dustRefs.current.map((el) => (el?.firstElementChild ? { el, rect: el.firstElementChild.getBoundingClientRect() } : null));

      const aim = (el: HTMLElement, rect: DOMRect, eyeLevel: number) => {
        if (!target) {
          el.style.setProperty("--px", "0");
          el.style.setProperty("--py", "0");
          el.style.setProperty("--lean", "0");
          return;
        }
        const dx = target.x - (rect.left + rect.width / 2);
        const dy = target.y - (rect.top + rect.height * eyeLevel);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 140) * 5;
        el.style.setProperty("--px", ((dx / dist) * reach).toFixed(2));
        el.style.setProperty("--py", ((dy / dist) * reach).toFixed(2));
        el.style.setProperty("--lean", Math.max(-1, Math.min(1, dx / 220)).toFixed(2));
      };

      sprites.forEach((s) => s && aim(s.el, s.rect, 0.42));
      dust.forEach((d) => {
        if (!d) return;
        aim(d.el, d.rect, 0.5);
        // Scurry away from the mouse cursor.
        let fx = 0;
        let fy = 0;
        if (mouse) {
          const dx = d.rect.left + d.rect.width / 2 - mouse.x;
          const dy = d.rect.top + d.rect.height / 2 - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < REPEL_RADIUS) {
            const push = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_PUSH;
            fx = (dx / dist) * push;
            fy = (dy / dist) * push;
          }
        }
        d.el.style.setProperty("--fx", `${fx.toFixed(1)}px`);
        d.el.style.setProperty("--fy", `${fy.toFixed(1)}px`);
        d.el.classList.toggle("is-fleeing", fx !== 0 || fy !== 0);
      });
    };

    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };

    // Work out where each background sprite runs to: a loose ring around the card.
    const layout = () => {
      const backdrop = backdropRef.current;
      const card = backdrop?.parentElement?.querySelector(".auth-card");
      if (!backdrop || !card) return;
      const box = backdrop.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      const cx = c.left - box.left + c.width / 2;
      const cy = c.top - box.top + c.height / 2;
      dustRefs.current.forEach((el, i) => {
        if (!el) return;
        const x = el.offsetLeft + el.offsetWidth / 2;
        const y = el.offsetTop + el.offsetHeight / 2;
        const angle = Math.atan2(y - cy, x - cx);
        // Only come part of the way, spread over a wide band, so they don't pile up.
        const spread = 60 + ((i * 53) % 240);
        let tx = cx + Math.cos(angle) * (c.width / 2 + spread);
        let ty = cy + Math.sin(angle) * (c.height / 2 + spread * 0.7);
        tx = Math.max(el.offsetWidth, Math.min(box.width - el.offsetWidth, tx));
        ty = Math.max(el.offsetHeight, Math.min(box.height - el.offsetHeight, ty));
        const pull = el.classList.contains("dust-runner") ? 0.7 : 0.45;
        el.style.setProperty("--gx", `${((tx - x) * pull).toFixed(1)}px`);
        el.style.setProperty("--gy", `${((ty - y) * pull).toFixed(1)}px`);
        el.style.setProperty("--ox", `${(Math.cos(angle) * 160).toFixed(1)}px`);
        el.style.setProperty("--oy", `${(Math.sin(angle) * 160).toFixed(1)}px`);
        el.classList.toggle("runs-right", tx > x);
      });
    };

    const syncFocus = () => {
      const active = document.activeElement;
      if (!isAuthInput(active)) setFocus("none");
      else setFocus(isPasswordField(active) ? "password" : "text");
      layout();
      schedule();
    };

    const onPointer = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      schedule();
    };

    const onPointerLeave = () => {
      pointer.current = null;
      schedule();
    };

    // Clicking the background sends a ripple out and the crowd hops in a wave.
    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (!el || el.closest(".auth-card, .auth-brand, button, input, a")) return;
      const backdrop = backdropRef.current;
      if (backdrop) {
        const box = backdrop.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "auth-ripple";
        ripple.style.left = `${e.clientX - box.left}px`;
        ripple.style.top = `${e.clientY - box.top}px`;
        ripple.addEventListener("animationend", () => ripple.remove());
        backdrop.appendChild(ripple);
        playSound("pop");
      }
      dustRefs.current.forEach((d) => {
        if (!d) return;
        const r = d.getBoundingClientRect();
        const dist = Math.hypot(r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY);
        if (dist < 420) setTimeout(() => hopDust(d), dist * 1.3);
      });
      spriteRefs.current.forEach((s, i) => {
        if (!s) return;
        const r = s.getBoundingClientRect();
        const dist = Math.hypot(r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY);
        if (dist < 420) setTimeout(() => hop(i), dist * 1.3);
      });
    };

    // Something is always happening: random sprites hop on their own.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const idle = reduceMotion ? 0 : window.setInterval(() => {
      for (let n = 0; n < 2; n++) {
        const d = dustRefs.current[Math.floor(Math.random() * dustRefs.current.length)];
        hopDust(d);
      }
      if (Math.random() < 0.35 && !document.activeElement?.closest(".auth-card")) {
        hop(Math.floor(Math.random() * SPRITES.length));
      }
    }, 1100);

    const onInput = (e: Event) => {
      const input = e.target as Element;
      if (isAuthInput(input)) {
        if (isPasswordField(input)) hop(HOP_ORDER[hopCount.current++ % HOP_ORDER.length]);
        else hop(hopCount.current++ % SPRITES.length, "nod");
      }
      schedule();
    };

    // focusout fires before the next element is focused, so wait a tick.
    const onFocusOut = () => setTimeout(syncFocus, 0);

    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("focusin", syncFocus);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("input", onInput);
    document.addEventListener("selectionchange", schedule);
    const onResize = () => {
      layout();
      schedule();
    };
    window.addEventListener("resize", onResize);
    syncFocus();

    return () => {
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("focusin", syncFocus);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("input", onInput);
      document.removeEventListener("selectionchange", schedule);
      window.removeEventListener("resize", onResize);
      if (frame.current) cancelAnimationFrame(frame.current);
      window.clearInterval(idle);
    };
  }, [hop]);

  useEffect(() => {
    if (!error) return;
    setErrorFlash(true);
    playSound("wrong");
    const t = setTimeout(() => setErrorFlash(false), 3200);
    return () => clearTimeout(t);
  }, [error]);

  useEffect(() => {
    if (celebrate) playSound("celebrate");
  }, [celebrate]);

  useEffect(() => {
    if (!notice) return;
    setHappyFlash(true);
    const t = setTimeout(() => setHappyFlash(false), 2600);
    return () => clearTimeout(t);
  }, [notice]);

  const mood: Mood = celebrate
    ? "celebrate"
    : errorFlash
    ? "error"
    : happyFlash
      ? "happy"
      : busy
        ? "busy"
        : focus === "password"
          ? passwordVisible ? "shy" : "curious"
          : focus === "text"
            ? "watching"
            : "idle";

  const bubbleText = mood === "error" ? "!" : mood === "happy" || mood === "celebrate" ? "♪" : "?";
  const moodClass = mood === "celebrate" ? "is-happy is-celebrate" : `is-${mood}`;

  return (
    <>
      <div ref={backdropRef} className={`auth-backdrop ${moodClass}`} aria-hidden="true">
        <span className="auth-glow glow-one" />
        <span className="auth-glow glow-two" />
        {DUST.map((d, i) => (
          <span
            key={i}
            ref={(el) => { dustRefs.current[i] = el; }}
            className={`dust${d.wideOnly ? " dust-wide-only" : ""}${d.size < 16 ? " dust-far" : ""}${d.runner ? " dust-runner" : ""}`}
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              "--s": `${d.size}px`,
              "--i": i,
              "--wander": `dust-wander-${i % 3}`,
              "--dur": `${9 + (i % 5) * 1.7}s`,
              "--d": `${-((i * 1.37) % 9).toFixed(2)}s`,
            } as CSSProperties}
          >
            <span className="dust-gather">
              <span className="dust-move">
                <span className="dust-bob">
                  <span className="dust-jump"><SootSprite look={d.look} /></span>
                </span>
              </span>
            </span>
          </span>
        ))}
        {CHIPS.map((word, i) => (
          <button key={word} type="button" tabIndex={-1} className={`auth-chip chip-${i}`} onClick={() => speak(word)}>
            {word}
          </button>
        ))}
      </div>

      <section className="auth-stage">
        <div className={`soot-ledge ${moodClass}`} aria-hidden="true">
          {SPRITES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { spriteRefs.current[i] = el; }}
              className="soot"
              style={{ "--x": s.x, "--s": s.size, "--d": `${s.delay}s`, "--i": i } as CSSProperties}
            >
              {s.bubble && <span className="soot-bubble">{bubbleText}</span>}
              <div className="soot-pop">
                <div
                  ref={(el) => { bobRefs.current[i] = el; }}
                  className="soot-bob"
                  onClick={() => { hop(i); playSound("pop"); }}
                  onAnimationEnd={(e) => {
                    if (e.target !== e.currentTarget) return;
                    e.currentTarget.classList.remove("hop", "nod");
                  }}
                >
                  <SootSprite look={s.look} tool={s.tool} sign={mood === "error" ? (i === 2 ? sign || "Sai rồi!" : SIDE_SIGNS[i]) : undefined} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {children}

        <div className={`soot-front ${moodClass}`} aria-hidden="true">
          <span className="soot-tile tile-a">A</span>
          <span className="soot-tile tile-b">b</span>
          <span className="soot-tile tile-c">C</span>
        </div>

        {celebrate && (
          <div className="auth-confetti" aria-hidden="true">
            {CONFETTI.map((c, i) => (
              <span
                key={i}
                className={`confetti confetti-${c.shape}`}
                style={{ "--tx": `${c.tx}px`, "--ty": `${c.ty}px`, "--rot": `${c.rot}deg`, "--c": c.color, animationDelay: `${c.delay}ms` } as CSSProperties}
              >
                {c.shape === "star" ? "★" : c.shape === "flower" ? "✿" : null}
              </span>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
