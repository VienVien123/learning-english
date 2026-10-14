"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { profileAvatar, profileInitial } from "@/lib/profile";

// The learner's picture, or their initial when there is none (or it fails to load).
export default function UserAvatar({ user, size = 36, className = "" }: { user: User | null; size?: number; className?: string }) {
  const src = profileAvatar(user);
  const [failed, setFailed] = useState<string | null>(null);
  const showImage = src && failed !== src;
  return (
    <span className={`user-avatar ${className}`} style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}>
      {showImage ? <img src={src} alt="" referrerPolicy="no-referrer" onError={() => setFailed(src)} /> : profileInitial(user)}
    </span>
  );
}
