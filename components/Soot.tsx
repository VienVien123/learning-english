"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type Bloom = "pink" | "yellow" | "green";
export type Item = "star-pink" | "star-yellow" | "flower-pink" | "flower-yellow" | "flower-green";
// Crochet-style accessories: a straw hat, a flower on the head, things to hold.
export type Look = { hat?: boolean; bloom?: Bloom; holdL?: Item; holdR?: Item };

// Spy gear the card sprites pull out to peek while the learner types.
export type Tool = "binoculars" | "magnifier" | "spyglass";

function fur(radius: number, spikes: number, seed: number) {
  let state = seed * 9301 + 49297;
  const rand = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  const points: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i / (spikes * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? radius + 5 + rand() * 6 : radius - rand() * 3;
    points.push(`${(Math.cos(angle) * r).toFixed(1)} ${(Math.sin(angle) * r).toFixed(1)}`);
  }
  return `M${points.join("L")}Z`;
}

const FUR_OUTER = fur(40, 46, 3);
const FUR_INNER = fur(38, 38, 11);

export function restartClass(el: Element | null | undefined, cls: string) {
  if (!el) return;
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}

const BLOOM_COLORS: Record<Bloom, [string, string]> = {
  pink: ["#f7b8cb", "#e88aa7"],
  yellow: ["#ffd86b", "#efb03a"],
  green: ["#bcd95c", "#8fb236"],
};

const STAR_COLORS = { "star-pink": "#f8c4d2", "star-yellow": "#fde8a2" };

function starPath(outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

const STAR = starPath(11, 5.2);
const PETALS = [0, 1, 2, 3, 4].map((k) => {
  const a = (k * 2 * Math.PI) / 5 - Math.PI / 2;
  return { cx: +(Math.cos(a) * 6).toFixed(1), cy: +(Math.sin(a) * 6).toFixed(1) };
});

export function Flower({ color, x, y, scale = 1, rotate = 0 }: { color: Bloom; x: number; y: number; scale?: number; rotate?: number }) {
  const [petal, heart] = BLOOM_COLORS[color];
  return (
    <g className="soot-flower" transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {PETALS.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="5.4" fill={petal} stroke={heart} strokeWidth="0.8" />
      ))}
      <circle r="3.4" fill={heart} />
    </g>
  );
}

function Held({ item, x, y }: { item: Item; x: number; y: number }) {
  if (item === "star-pink" || item === "star-yellow") {
    const fill = STAR_COLORS[item];
    return <path className="soot-star" d={STAR} transform={`translate(${x} ${y}) rotate(-12)`} fill={fill} stroke={fill} strokeWidth="3.4" strokeLinejoin="round" />;
  }
  return <Flower color={item.slice(7) as Bloom} x={x} y={y} scale={0.9} rotate={18} />;
}

export type SignTone = "bad" | "good";

export function Sign({ text, tone = "bad" }: { text: string; tone?: SignTone }) {
  const short = text.length <= 6;
  const width = Math.min(156, Math.max(56, text.length * (short ? 11 : 7.4) + 24));
  const half = width / 2;
  return (
    <g className={`soot-sign tone-${tone}`}>
      <g className="soot-sign-wave">
        <path className="soot-sign-stick" d={`M-50 -7 L${-half + 10} -66 M50 -7 L${half - 10} -66`} />
        <rect className="soot-sign-board" x={-half} y="-102" width={width} height="38" rx="9" />
        <text className="soot-sign-text" x="0" y="-82.5" textAnchor="middle" dominantBaseline="central" fontSize={short ? 18 : 13}>
          {text}
        </text>
        <circle className="soot-joint" cx="-50.5" cy="-6.8" r="4.8" />
        <circle className="soot-joint" cx="50.5" cy="-6.8" r="4.8" />
      </g>
    </g>
  );
}

export function SpyTool({ tool }: { tool: Tool }) {
  return (
    <g className="tool">
      <g className="tool-move">
        {tool === "binoculars" && (
          <>
            <rect x="-7" y="-14" width="14" height="10" rx="3" fill="#3d5ea8" />
            {[-15, 15].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="-5" r="15.5" fill="rgba(175, 215, 255, .22)" stroke="#5b8ed8" strokeWidth="5.5" />
                <circle cx={cx} cy="-5" r="18" fill="none" stroke="#2f4a8a" strokeWidth="1.6" />
                <path className="tool-glint" d={`M${cx - 9} -12 Q${cx - 5} -17 ${cx + 1} -16`} />
              </g>
            ))}
            <circle className="soot-joint" cx="-33" cy="2" r="5.2" />
            <circle className="soot-joint" cx="33" cy="2" r="5.2" />
          </>
        )}
        {tool === "magnifier" && (
          <>
            <path d="M27 8 L43 25" stroke="#8a5a2b" strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="14" cy="-5" r="17.5" fill="rgba(190, 228, 255, .2)" stroke="#d9a441" strokeWidth="4.6" />
            <circle cx="14" cy="-5" r="20" fill="none" stroke="#b07a2a" strokeWidth="1.2" />
            <path className="tool-glint" d="M3 -14 Q8 -20 15 -19" />
            <circle className="soot-joint" cx="41" cy="22" r="5.2" />
          </>
        )}
        {tool === "spyglass" && (
          <>
            <g transform="translate(14 -5) rotate(26)">
              <rect x="-6" y="-8" width="17" height="16" rx="2.5" fill="#6e4b29" />
              <rect x="10" y="-9.5" width="16" height="19" rx="2.5" fill="#c8923f" />
              <rect x="25" y="-11.5" width="19" height="23" rx="3" fill="#e2ad4e" />
              <path d="M18 -9.5 V9.5 M34 -11.5 V11.5" stroke="#8a5a2b" strokeWidth="1.4" />
              <ellipse cx="44" cy="0" rx="3.4" ry="11" fill="#cfe7ff" stroke="#8a5a2b" strokeWidth="1.6" />
              <path className="tool-glint" d="M43 -7 Q45 -2 43 3" />
            </g>
            <circle className="soot-joint" cx="20" cy="12" r="5.2" />
            <circle className="soot-joint" cx="36" cy="21" r="5.2" />
          </>
        )}
      </g>
    </g>
  );
}

export function SootSprite({ look, sign, signTone, tool }: { look: Look; sign?: string; signTone?: SignTone; tool?: Tool }) {
  return (
    <svg viewBox="-60 -60 120 120" className={`soot-svg${tool ? ` has-tool with-${tool}` : ""}${sign ? " has-sign" : ""}`}>
      <defs>
        <radialGradient id="soot-sheen" cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#4a4652" />
          <stop offset="55%" stopColor="#24212a" />
          <stop offset="100%" stopColor="#141218" />
        </radialGradient>
      </defs>

      {/* Thin wire legs with round feet */}
      {[-1, 1].map((side) => (
        <g key={side} transform={`translate(${side * 11} 34)`}>
          <g className={`soot-leg ${side < 0 ? "leg-l" : "leg-r"}`}>
            <path className="soot-limb" d={`M0 0 Q${side * -3} 10 ${side * 2} 20`} />
            <ellipse className="soot-joint" cx={side * 3} cy="23" rx="6.6" ry="5.2" />
          </g>
        </g>
      ))}

      {/* Arms, holding whatever this sprite carries */}
      {[-1, 1].map((side) => {
        const item = side < 0 ? look.holdL : look.holdR;
        return (
          <g key={side} transform={`translate(${side * 33} 6)`}>
            <g className={`soot-raise ${side < 0 ? "raise-l" : "raise-r"}`}>
              <g className={`soot-arm ${side < 0 ? "arm-l" : "arm-r"}`}>
                <path className="soot-limb" d={`M0 0 Q${side * 10} 2 ${side * 17} 11`} />
                <circle className="soot-joint" cx={side * 18} cy="12" r="4.6" />
                {item && <Held item={item} x={side * 21} y={16} />}
              </g>
            </g>
          </g>
        );
      })}

      <path className="soot-fur" d={FUR_OUTER} />
      <path className="soot-fur inner" d={FUR_INNER} transform="rotate(4)" />
      <circle r="38" fill="url(#soot-sheen)" />

      <g className="soot-brows">
        <path d="M-24 -24 L-8 -20" />
        <path d="M24 -24 L8 -20" />
      </g>

      <g className="soot-eyes">
        {[-14, 14].map((cx) => (
          <g key={cx} transform={`translate(${cx} -5)`} className={cx < 0 ? "eye-l" : "eye-r"}>
            <g className="soot-eye-zoom">
              <g className="soot-eye">
                <ellipse className="soot-white" rx="12" ry="13" />
                <g className="soot-pupil">
                  <g className="soot-iris">
                    <circle r="6.2" fill="#121016" />
                    <circle cx="-2" cy="-2.4" r="2" fill="#fff" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        ))}
      </g>

      <path className="soot-wink" d="M-22 -4 Q-14 2 -6 -4" />

      <g className="soot-shut">
        <path d="M-21 -11 L-9 -5 L-21 1" />
        <path d="M21 -11 L9 -5 L21 1" />
      </g>
      <g className="soot-joy">
        <path d="M-23 -3 Q-14 -15 -5 -3" />
        <path d="M5 -3 Q14 -15 23 -3" />
      </g>

      <ellipse className="soot-blush" cx="-25" cy="11" rx="6.5" ry="3.6" />
      <ellipse className="soot-blush" cx="25" cy="11" rx="6.5" ry="3.6" />
      <ellipse className="soot-mouth-o" cx="0" cy="15" rx="3.4" ry="4" />
      <path className="soot-mouth-smile" d="M-6 13 Q0 20 6 13" />

      {look.bloom && <Flower color={look.bloom} x={-20} y={-36} rotate={-14} />}

      {look.hat && (
        <g className="soot-hat" transform="translate(2 -38) rotate(-9)">
          <ellipse rx="33" ry="8.5" fill="#e3a63d" stroke="#c78a27" strokeWidth="1.2" />
          <path d="M-17 -1 Q-18 -23 0 -24 Q18 -23 17 -1 Z" fill="#e8ad45" stroke="#c78a27" strokeWidth="1.2" />
          <path className="soot-hat-rib" d="M-16.5 -8 Q0 -11 16.5 -8 M-15 -15 Q0 -18 15 -15 M-26 2 Q0 7 26 2" />
        </g>
      )}

      {tool && <SpyTool tool={tool} />}
      {sign && <Sign text={sign} tone={signTone} />}
    </svg>
  );
}

/* ---------- Reusable pieces for the rest of the app ---------- */

export type SootMood = "idle" | "watching" | "curious" | "shy" | "busy" | "error" | "happy";

// Every `.soot-track` element on the page looks at the mouse pointer.
export function useSootEyes() {
  useEffect(() => {
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    const update = () => {
      frame = 0;
      const els = Array.from(document.querySelectorAll<HTMLElement>(".soot-track"));
      const rects = els.map((el) => el.getBoundingClientRect());
      els.forEach((el, i) => {
        if (!pointer) return;
        const r = rects[i];
        const dx = pointer.x - (r.left + r.width / 2);
        const dy = pointer.y - (r.top + r.height * 0.45);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 140) * 5;
        el.style.setProperty("--px", ((dx / dist) * reach).toFixed(2));
        el.style.setProperty("--py", ((dy / dist) * reach).toFixed(2));
        el.style.setProperty("--lean", Math.max(-1, Math.min(1, dx / 260)).toFixed(2));
      });
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

function hopOnClick(e: { currentTarget: Element }) {
  restartClass(e.currentTarget, "hop");
}

function clearHop(e: { target: EventTarget; currentTarget: Element }) {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove("hop", "nod");
}

export type CrewMember = { x: number; size: number; look: Look; tool?: Tool; bubble?: boolean };

type CrewProps = {
  members: CrewMember[];
  mood?: SootMood;
  signs?: (string | undefined)[];
  signTone?: SignTone;
  bubble?: string;
  // Changing this number makes the whole crew hop once.
  cheer?: number;
  ledge?: number;
  className?: string;
  children: ReactNode;
};

// A row of sprites hiding behind the top edge of whatever card is passed as children.
export function PeekCrew({ members, mood = "idle", signs, signTone = "bad", bubble = "?", cheer = 0, ledge = 92, className = "", children }: CrewProps) {
  const bobs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!cheer) return;
    const timers = bobs.current.map((el, i) => window.setTimeout(() => restartClass(el, "hop"), i * 70));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cheer]);

  return (
    <div className={`peek-host ${className}`} style={{ "--ledge": `${ledge}px` } as CSSProperties}>
      <div className={`soot-crew is-${mood}`} aria-hidden="true">
        {members.map((m, i) => (
          <div key={i} className="soot soot-track" style={{ "--x": m.x, "--s": m.size, "--d": `${-(i * 0.7) % 3}s`, "--i": i } as CSSProperties}>
            {m.bubble && <span className="soot-bubble">{bubble}</span>}
            <div className="soot-pop">
              <div ref={(el) => { bobs.current[i] = el; }} className="soot-bob" onClick={hopOnClick} onAnimationEnd={clearHop}>
                <SootSprite look={m.look} tool={m.tool} sign={signs?.[i] || undefined} signTone={signTone} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

type BuddyProps = { size?: number; look?: Look; tool?: Tool; mood?: SootMood; sign?: string; signTone?: SignTone; className?: string };

// A single sprite for empty states, toasts and small cards.
export function SootBuddy({ size = 48, look = {}, tool, mood = "idle", sign, signTone, className = "" }: BuddyProps) {
  return (
    <span className={`soot-buddy soot-track is-${mood} ${className}`} style={{ "--s": `${size}px` } as CSSProperties} aria-hidden="true">
      <span className="soot-bob" onClick={hopOnClick} onAnimationEnd={clearHop}>
        <SootSprite look={look} tool={tool} sign={sign} signTone={signTone} />
      </span>
    </span>
  );
}

// Sprites peeking in from the right and bottom edges of the screen, so they never sit behind text.
type Peeker = { edge: "right" | "bottom"; pos: number; size: number; look: Look; dur: number; delay: number };
const PEEKERS: Peeker[] = [
  { edge: "right", pos: 24, size: 46, look: { bloom: "pink" }, dur: 11, delay: -2 },
  { edge: "right", pos: 52, size: 58, look: { hat: true, holdL: "star-yellow" }, dur: 13, delay: -7 },
  { edge: "right", pos: 80, size: 40, look: { bloom: "green" }, dur: 10, delay: -4 },
  { edge: "bottom", pos: 34, size: 44, look: { bloom: "yellow", holdR: "star-pink" }, dur: 12, delay: -9 },
  { edge: "bottom", pos: 58, size: 54, look: {}, dur: 14, delay: -1 },
  { edge: "bottom", pos: 80, size: 42, look: { hat: true }, dur: 11, delay: -6 },
];

export function SootBackdrop() {
  return (
    <div className="app-backdrop" aria-hidden="true">
      {PEEKERS.map((p, i) => (
        <span
          key={i}
          className={`edge-peeker edge-${p.edge} soot-track`}
          style={{ "--s": `${p.size}px`, "--pos": `${p.pos}%`, "--dur": `${p.dur}s`, "--delay": `${p.delay}s`, "--d": `${-i * 0.6}s` } as CSSProperties}
        >
          <span className="edge-peeker-slide">
            <span className="soot-bob"><SootSprite look={p.look} /></span>
          </span>
        </span>
      ))}
    </div>
  );
}
