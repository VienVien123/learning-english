import { supabase } from "./supabase";
import type { Vocabulary } from "./types";

// Two entries are the same word when they match ignoring case and extra spaces, in any deck.
export function wordKey(word: string) {
  return word.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

const filled = (value: string | null | undefined) => Boolean(value?.trim());
const listed = (value: string[] | null | undefined) => (value ?? []).some((v) => v.trim());

/** How fully a word is explained: each filled field counts, longer text breaks ties. */
export function richness(w: Pick<Vocabulary, "meaning" | "pronunciation" | "part_of_speech" | "example" | "example_translation" | "note" | "synonyms" | "antonyms" | "tags" | "image_url">) {
  const fields =
    (filled(w.meaning) ? 2 : 0) +
    (filled(w.example) ? 2 : 0) +
    (filled(w.example_translation) ? 1 : 0) +
    (filled(w.pronunciation) ? 1 : 0) +
    (filled(w.part_of_speech) ? 1 : 0) +
    (filled(w.note) ? 1 : 0) +
    (listed(w.synonyms) ? 1 : 0) +
    (listed(w.antonyms) ? 1 : 0) +
    (listed(w.tags) ? 1 : 0) +
    (filled(w.image_url) ? 1 : 0);
  const length = [w.meaning, w.example, w.example_translation, w.note].reduce((n, s) => n + (s?.trim().length ?? 0), 0)
    + [...(w.synonyms ?? []), ...(w.antonyms ?? [])].length * 5;
  return fields * 1000 + Math.min(length, 999);
}

// Richer explanation wins; on a tie keep the word with more practice, then the older one.
function better(a: Vocabulary, b: Vocabulary) {
  return richness(b) - richness(a)
    || b.review_count - a.review_count
    || a.created_at.localeCompare(b.created_at);
}

export type DuplicateGroup = { keep: Vocabulary; remove: Vocabulary[] };

export function findDuplicateGroups(words: Vocabulary[]): DuplicateGroup[] {
  const byKey = new Map<string, Vocabulary[]>();
  for (const w of words) {
    const key = wordKey(w.word);
    byKey.set(key, [...(byKey.get(key) ?? []), w]);
  }
  return [...byKey.values()]
    .filter((list) => list.length > 1)
    .map((list) => {
      const [keep, ...remove] = [...list].sort(better);
      return { keep, remove };
    });
}

/**
 * Changes for the kept word: blanks are filled from the removed copies, and the most
 * advanced review progress is carried over so no learning is lost. Uses max rather than
 * sums so running it twice gives the same result.
 */
function keptPatch({ keep, remove }: DuplicateGroup) {
  const all = [keep, ...remove];
  const pick = (field: "pronunciation" | "part_of_speech" | "example" | "example_translation" | "note" | "image_url") =>
    filled(keep[field]) ? keep[field] : all.find((w) => filled(w[field]))?.[field] ?? null;
  const pickList = (field: "synonyms" | "antonyms" | "tags") =>
    listed(keep[field]) ? keep[field] : all.find((w) => listed(w[field]))?.[field] ?? [];
  const furthest = [...all].sort((a, b) => b.mastery_level - a.mastery_level || (b.last_reviewed_at ?? "").localeCompare(a.last_reviewed_at ?? ""))[0];
  return {
    pronunciation: pick("pronunciation"),
    part_of_speech: pick("part_of_speech"),
    example: pick("example"),
    example_translation: pick("example_translation"),
    note: pick("note"),
    image_url: pick("image_url"),
    synonyms: pickList("synonyms"),
    antonyms: pickList("antonyms"),
    tags: pickList("tags"),
    favorite: all.some((w) => w.favorite),
    mastery_level: furthest.mastery_level,
    last_reviewed_at: furthest.last_reviewed_at,
    next_review_at: furthest.next_review_at,
    review_count: Math.max(...all.map((w) => w.review_count)),
    correct_count: Math.max(...all.map((w) => w.correct_count)),
    wrong_count: Math.max(...all.map((w) => w.wrong_count)),
    updated_at: new Date().toISOString(),
  };
}

export type MergeReport = {
  // The kept word of each merged group, after the merge.
  merged: Vocabulary[];
  // Removed id -> id of the word kept in its place.
  replacedBy: Map<string, string>;
  error?: string;
};

// Ids removed in this session: a load that started before a merge finished must not see them again.
const removedIds = new Set<string>();
let running: Promise<MergeReport> | null = null;

/** Keeps the best-explained copy of every duplicated word and deletes the others. */
export async function mergeDuplicateWords(uid: string, words: Vocabulary[]): Promise<{ words: Vocabulary[]; report: MergeReport }> {
  while (running) await running.catch(() => null);
  const current = words.filter((w) => !removedIds.has(w.id));
  const groups = findDuplicateGroups(current);
  if (!groups.length) return { words: current, report: { merged: [], replacedBy: new Map() } };

  const run = (async () => {
    const report: MergeReport = { merged: [], replacedBy: new Map() };
    for (const group of groups) {
      const patch = keptPatch(group);
      const removeIds = group.remove.map((w) => w.id);

      const { error: updateError } = await supabase.from("vocabularies").update(patch).eq("id", group.keep.id).eq("user_id", uid);
      if (updateError) { report.error = updateError.message; continue; }

      // Review history belongs to the word it was made on and is deleted with it;
      // copy it onto the kept word first so the activity calendar keeps those days.
      const { data: history, error: historyError } = await supabase.from("review_history")
        .select("rating,previous_level,new_level,reviewed_at").eq("user_id", uid).in("vocabulary_id", removeIds);
      if (historyError) { report.error = historyError.message; continue; }
      if (history?.length) {
        const { error: copyError } = await supabase.from("review_history")
          .insert(history.map((h) => ({ ...h, user_id: uid, vocabulary_id: group.keep.id })));
        if (copyError) { report.error = copyError.message; continue; }
      }

      const { error: deleteError } = await supabase.from("vocabularies").delete().in("id", removeIds).eq("user_id", uid);
      if (deleteError) { report.error = deleteError.message; continue; }

      removeIds.forEach((id) => { removedIds.add(id); report.replacedBy.set(id, group.keep.id); });
      report.merged.push({ ...group.keep, ...patch });
    }
    return report;
  })();
  running = run;

  try {
    const report = await run;
    const keptById = new Map(report.merged.map((w) => [w.id, w]));
    return {
      words: current.filter((w) => !report.replacedBy.has(w.id)).map((w) => keptById.get(w.id) ?? w),
      report,
    };
  } finally {
    if (running === run) running = null;
  }
}

/** The message shown to the learner after duplicates were merged. */
export function mergeMessage(merged: Vocabulary[]) {
  if (merged.length === 1) {
    return `Từ “${merged[0].word}” bị trùng: đã giữ bản giải thích đầy đủ hơn, xoá bản còn lại (tiến độ ôn được giữ nguyên).`;
  }
  const names = merged.slice(0, 5).map((w) => `“${w.word}”`).join(", ");
  const more = merged.length > 5 ? ` và ${merged.length - 5} từ khác` : "";
  return `Đã gộp ${merged.length} từ trùng: ${names}${more}. Giữ bản giải thích đầy đủ hơn, xoá bản còn lại (tiến độ ôn được giữ nguyên).`;
}
