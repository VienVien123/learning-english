"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { Camera, Check, Loader2, LogOut, Mail, Moon, Sun, Trash2, Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { effectiveStreak, levelInfo } from "@/lib/gamification";
import type { UserProgress } from "@/lib/types";
import { AVATAR_BUCKET, NAME_MAX, profileName, squareAvatar } from "@/lib/profile";
import { playSound } from "@/lib/sound";
import { PeekCrew, type CrewMember } from "./Soot";
import UserAvatar from "./UserAvatar";

const CREW: CrewMember[] = [
  { x: 14, size: 64, look: { bloom: "green", holdR: "star-pink" } },
  { x: 32, size: 82, look: { hat: true }, bubble: true },
  { x: 72, size: 96, look: { bloom: "pink", holdL: "star-yellow", holdR: "flower-yellow" } },
  { x: 90, size: 62, look: { bloom: "yellow" } },
];

type Notice = { kind: "ok" | "error"; text: string } | null;

function uploadError(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("bucket not found")) return "Chưa có nơi lưu ảnh. Hãy chạy file supabase/profile.sql trong Supabase → SQL Editor rồi thử lại.";
  if (lower.includes("row-level security") || lower.includes("unauthorized")) return "Supabase chưa cho phép tải ảnh lên. Hãy chạy lại file supabase/profile.sql.";
  if (lower.includes("payload too large") || lower.includes("exceeded")) return "Ảnh quá lớn, hãy chọn ảnh khác.";
  return message;
}

export default function ProfileView({
  user,
  progress,
  wordCount,
  masteredCount,
  onUserUpdated,
  onSignOut,
  theme,
  onToggleTheme,
  soundOn,
  onToggleSound,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  user: User;
  progress: UserProgress;
  wordCount: number;
  masteredCount: number;
  onUserUpdated: (user: User) => void;
  onSignOut: () => void;
}) {
  const [name, setName] = useState(profileName(user));
  const [savingName, setSavingName] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setName(profileName(user)), [user]);

  const level = levelInfo(progress.total_xp);
  const providers = ((user.app_metadata?.providers as string[] | undefined) ?? [user.app_metadata?.provider ?? "email"]).filter(Boolean);
  const hasCustomAvatar = !!user.user_metadata?.custom_avatar_url;
  const trimmed = name.trim();
  const nameChanged = trimmed !== profileName(user);

  async function updateMetadata(data: Record<string, unknown>) {
    const { data: result, error } = await supabase.auth.updateUser({ data });
    if (error) throw new Error(error.message);
    if (result.user) onUserUpdated(result.user);
  }

  async function saveName(e: FormEvent) {
    e.preventDefault();
    if (!trimmed || trimmed.length > NAME_MAX) return;
    setSavingName(true);
    setNotice(null);
    try {
      await updateMetadata({ display_name: trimmed });
      playSound("correct");
      setNotice({ kind: "ok", text: "Đã lưu tên hiển thị." });
    } catch (err) {
      setNotice({ kind: "error", text: err instanceof Error ? err.message : "Không lưu được tên." });
    } finally {
      setSavingName(false);
    }
  }

  // Delete every picture in the user's folder except the one to keep.
  async function cleanFolder(keep?: string) {
    const { data } = await supabase.storage.from(AVATAR_BUCKET).list(user.id);
    const stale = (data ?? []).map((f) => `${user.id}/${f.name}`).filter((path) => path !== keep);
    if (stale.length) await supabase.storage.from(AVATAR_BUCKET).remove(stale);
  }

  async function onPickFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice({ kind: "error", text: "Hãy chọn một tệp ảnh (JPG, PNG, WebP…)." });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setNotice({ kind: "error", text: "Ảnh lớn hơn 15 MB, hãy chọn ảnh nhỏ hơn." });
      return;
    }
    setUploading(true);
    setNotice(null);
    try {
      const blob = await squareAvatar(file);
      const path = `${user.id}/avatar-${Date.now()}.jpg`;
      const { error } = await supabase.storage.from(AVATAR_BUCKET).upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000", upsert: true });
      if (error) throw new Error(uploadError(error.message));
      const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
      await updateMetadata({ custom_avatar_url: data.publicUrl });
      void cleanFolder(path).catch(() => {});
      playSound("correct");
      setNotice({ kind: "ok", text: "Đã cập nhật ảnh đại diện." });
    } catch (err) {
      setNotice({ kind: "error", text: err instanceof Error ? err.message : "Không tải ảnh lên được." });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function removeAvatar() {
    setUploading(true);
    setNotice(null);
    try {
      await updateMetadata({ custom_avatar_url: null });
      void cleanFolder().catch(() => {});
      setNotice({ kind: "ok", text: "Đã xoá ảnh đại diện." });
    } catch (err) {
      setNotice({ kind: "error", text: err instanceof Error ? err.message : "Không xoá được ảnh." });
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <div className="page-header"><div><div className="eyebrow">PROFILE</div><h1>Trang cá nhân</h1><p>Đặt tên hiển thị và ảnh đại diện cho tài khoản của bạn.</p></div></div>
      <div className="profile-layout">
        <PeekCrew className="profile-peek" members={CREW} signs={[undefined, undefined, "Xin chào!"]} signTone="good" ledge={88}>
          <section className="panel profile-card">
            <div className="profile-avatar-wrap">
              <UserAvatar user={user} size={128} className="profile-avatar" />
              <button className="profile-camera" onClick={() => fileRef.current?.click()} disabled={uploading} aria-label="Đổi ảnh đại diện">
                {uploading ? <Loader2 className="spin" size={18} /> : <Camera size={18} />}
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => void onPickFile(e.target.files?.[0])} />
            </div>
            <div className="profile-avatar-actions">
              <button className="button secondary compact" onClick={() => fileRef.current?.click()} disabled={uploading}><Camera size={15} /> {uploading ? "Đang tải ảnh…" : "Đổi ảnh đại diện"}</button>
              {hasCustomAvatar && <button className="button secondary compact danger-text" onClick={() => void removeAvatar()} disabled={uploading}><Trash2 size={15} /> Xoá ảnh</button>}
            </div>

            <form className="profile-name" onSubmit={saveName}>
              <label htmlFor="display-name">Tên hiển thị</label>
              <div>
                <input id="display-name" value={name} maxLength={NAME_MAX} onChange={(e) => setName(e.target.value)} placeholder="Tên của bạn" autoComplete="nickname" />
                <button className="button primary" disabled={!trimmed || !nameChanged || savingName}>{savingName ? <Loader2 className="spin" size={16} /> : <Check size={16} />} Lưu</button>
              </div>
              <small>{trimmed.length}/{NAME_MAX} ký tự · tên này hiện ở lời chào và trên thanh bên.</small>
            </form>

            {notice && <div className={`profile-notice ${notice.kind}`}>{notice.text}</div>}

            <dl className="profile-facts">
              <div><dt>Email</dt><dd><Mail size={15} /> {user.email ?? "—"}</dd></div>
              <div><dt>Đăng nhập bằng</dt><dd>{providers.map((p) => <span key={p} className="profile-chip-tag">{p === "google" ? "Google" : p === "email" ? "Email" : p}</span>)}</dd></div>
              <div><dt>Tham gia từ</dt><dd>{new Date(user.created_at).toLocaleDateString("vi-VN")}</dd></div>
            </dl>
          </section>
        </PeekCrew>

        <aside className="profile-side">
          <section className="panel profile-stats">
            <h2>Hành trình học</h2>
            <div className="profile-stat-grid">
              <div><strong>{wordCount}</strong><span>từ vựng</span></div>
              <div><strong>{masteredCount}</strong><span>đã thành thạo</span></div>
              <div><strong>Lv {level.level}</strong><span>{progress.total_xp.toLocaleString()} XP</span></div>
              <div><strong>🔥 {effectiveStreak(progress)}</strong><span>ngày liên tiếp · kỷ lục {progress.best_streak}</span></div>
            </div>
          </section>
          <section className="panel profile-settings">
            <h2>Cài đặt</h2>
            <button className="setting-row" onClick={onToggleTheme}>
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}<span>Giao diện tối</span>
              <i className={`switch${theme === "dark" ? " on" : ""}`} aria-hidden="true" />
            </button>
            <button className="setting-row" onClick={onToggleSound}>
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}<span>Hiệu ứng âm thanh</span>
              <i className={`switch${soundOn ? " on" : ""}`} aria-hidden="true" />
            </button>
            <button className="button secondary profile-signout-btn" onClick={onSignOut}><LogOut size={16} /> Đăng xuất</button>
          </section>
        </aside>
      </div>
    </>
  );
}
