import { useId } from "react";

type MarkProps = { size?: number; className?: string };

// A little TV with soot-sprite eyes, antennas and round feet.
export function LogoMark({ size = 40, className = "" }: MarkProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={`logo-mark ${className}`} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cb3f0" />
          <stop offset="1" stopColor="#4a6fc4" />
        </linearGradient>
      </defs>
      <path d="M32 18 L20 6 M32 18 L45 7" stroke="#3d5ea8" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="20" cy="6" r="3.6" fill="#f6c453" />
      <circle cx="45" cy="7" r="3.6" fill="#ef8fa6" />
      <path d="M21 56 L19 61 M43 56 L45 61" stroke="#1b1820" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="18.5" cy="61.2" rx="3.4" ry="2.4" fill="#1b1820" />
      <ellipse cx="45.5" cy="61.2" rx="3.4" ry="2.4" fill="#1b1820" />
      <rect x="5" y="17" width="54" height="40" rx="12" fill={`url(#${id}-body)`} />
      <rect x="5" y="17" width="54" height="40" rx="12" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
      <rect x="11" y="23" width="34" height="28" rx="8" fill="#1b1820" />
      <circle cx="21.5" cy="36" r="6" fill="#fff" />
      <circle cx="34.5" cy="36" r="6" fill="#fff" />
      <circle cx="23.2" cy="37.2" r="2.7" fill="#1b1820" />
      <circle cx="36.2" cy="37.2" r="2.7" fill="#1b1820" />
      <circle cx="22.4" cy="36.1" r=".9" fill="#fff" />
      <circle cx="35.4" cy="36.1" r=".9" fill="#fff" />
      <ellipse cx="16" cy="45.5" rx="2.6" ry="1.4" fill="#ef8fa6" opacity=".75" />
      <ellipse cx="40" cy="45.5" rx="2.6" ry="1.4" fill="#ef8fa6" opacity=".75" />
      <circle cx="52" cy="29" r="3.2" fill="#f6c453" />
      <circle cx="52" cy="38.5" r="3.2" fill="#fff" fillOpacity=".85" />
      <path d="M49 46.5h6M49 50h6" stroke="#fff" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type LogoProps = { size?: number; tagline?: string; className?: string };

export function Logo({ size = 40, tagline, className = "" }: LogoProps) {
  return (
    <span className={`brand-logo ${className}`}>
      <LogoMark size={size} />
      <span className="brand-text">
        <strong className="brand-name"><span>TV</span>-English</strong>
        {tagline && <small>{tagline}</small>}
      </span>
    </span>
  );
}
