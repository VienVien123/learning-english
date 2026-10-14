import type { User } from "@supabase/supabase-js";

// Our own keys in user_metadata. Google overwrites avatar_url / full_name on every sign-in,
// so a picture the learner uploads lives under custom_avatar_url instead.
export const AVATAR_BUCKET = "avatars";
export const NAME_MAX = 40;

export function profileName(user: User | null) {
  const meta = user?.user_metadata ?? {};
  return (meta.display_name || meta.full_name || meta.name || user?.email?.split("@")[0] || "Learner") as string;
}

export function profileAvatar(user: User | null): string | null {
  const meta = user?.user_metadata ?? {};
  return (meta.custom_avatar_url || meta.avatar_url || meta.picture || null) as string | null;
}

export function profileInitial(user: User | null) {
  return profileName(user).trim().slice(0, 1).toUpperCase() || "U";
}

// Crop the middle square of an image and shrink it, so uploads stay small (~20–40 KB).
export async function squareAvatar(file: File, size = 256): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size);
  bitmap.close();
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("encode"))), "image/jpeg", 0.88));
}
