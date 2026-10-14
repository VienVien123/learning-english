"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { localDateKey } from "@/lib/gamification";

const DAY = 86400000;
const PAGE = 1000;
const MONTHS = ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"];
const WEEKDAYS = ["T2", "", "T4", "", "T6", "", "CN"];

// Monday-based day index (0 = Monday … 6 = Sunday).
const weekday = (d: Date) => (d.getDay() + 6) % 7;

/**
 * GitHub-style calendar of how many words were reviewed each day,
 * shaded against the learner's daily goal.
 */
export default function ActivityHeatmap({
  userId,
  goal,
  weeks = 53,
  today = 0,
  refreshKey = 0,
  compact = false,
}: {
  userId: string;
  goal: number;
  weeks?: number;
  // Answers already counted for today (games, lessons) in case history lags behind.
  today?: number;
  // Change this to refetch, e.g. after new reviews.
  refreshKey?: number;
  compact?: boolean;
}) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  // Start of the first column: the Monday `weeks - 1` weeks before this week.
  const start = useMemo(() => {
    const now = new Date();
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - weekday(now));
    return new Date(monday.getTime() - (weeks - 1) * 7 * DAY);
  }, [weeks]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next: Record<string, number> = {};
      // Page through review history; PostgREST caps each response.
      for (let page = 0; page < 30; page++) {
        const { data, error } = await supabase
          .from("review_history")
          .select("reviewed_at")
          .eq("user_id", userId)
          .gte("reviewed_at", start.toISOString())
          .order("reviewed_at", { ascending: true })
          .range(page * PAGE, page * PAGE + PAGE - 1);
        if (error || !data) break;
        for (const row of data as { reviewed_at: string }[]) {
          const key = localDateKey(new Date(row.reviewed_at));
          next[key] = (next[key] ?? 0) + 1;
        }
        if (data.length < PAGE) break;
      }
      if (!cancelled) {
        setCounts(next);
        setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [userId, start, refreshKey]);

  // Show the most recent weeks first on narrow screens.
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, [loaded]);

  const todayKey = localDateKey();
  const days = useMemo(() => {
    const list: { key: string; date: Date; count: number; future: boolean }[] = [];
    for (let i = 0; i < weeks * 7; i++) {
      const date = new Date(start.getTime() + i * DAY);
      const key = localDateKey(date);
      const count = key === todayKey ? Math.max(counts[key] ?? 0, today) : counts[key] ?? 0;
      list.push({ key, date, count, future: key > todayKey });
    }
    return list;
  }, [counts, start, today, todayKey, weeks]);

  const level = (count: number) => (count <= 0 ? 0 : count < goal * 0.25 ? 1 : count < goal * 0.5 ? 2 : count < goal ? 3 : 4);

  const summary = useMemo(() => {
    const past = days.filter((d) => !d.future);
    let current = 0;
    for (let i = past.length - 1; i >= 0; i--) {
      if (past[i].count > 0) current++;
      else if (past[i].key !== todayKey) break;
    }
    let best = 0;
    let run = 0;
    for (const d of past) {
      run = d.count > 0 ? run + 1 : 0;
      best = Math.max(best, run);
    }
    return {
      total: past.reduce((sum, d) => sum + d.count, 0),
      active: past.filter((d) => d.count > 0).length,
      goalDays: past.filter((d) => d.count >= goal).length,
      current,
      best,
    };
  }, [days, goal, todayKey]);

  const monthLabels = useMemo(() => {
    const labels: { col: number; text: string }[] = [];
    let lastMonth = -1;
    for (let w = 0; w < weeks; w++) {
      const first = days[w * 7];
      if (first && first.date.getMonth() !== lastMonth) {
        lastMonth = first.date.getMonth();
        if (w < weeks - 1) labels.push({ col: w, text: MONTHS[lastMonth] });
      }
    }
    return labels;
  }, [days, weeks]);

  return (
    <div className={`heatmap${compact ? " compact" : ""}`}>
      <div className="heatmap-summary">
        <span><b>{summary.total}</b> lượt ôn</span>
        <span><b>{summary.active}</b> ngày học</span>
        <span><b>{summary.goalDays}</b> ngày đạt mục tiêu</span>
        <span>🔥 <b>{summary.current}</b> ngày liên tiếp · kỷ lục <b>{summary.best}</b></span>
      </div>
      <div className="heatmap-scroll" ref={scroller}>
        <div className="heatmap-grid" style={{ gridTemplateColumns: `22px repeat(${weeks}, var(--cell))` }}>
          <span />
          {Array.from({ length: weeks }, (_, w) => {
            const label = monthLabels.find((m) => m.col === w);
            return <span key={`m${w}`} className="heatmap-month">{label?.text ?? ""}</span>;
          })}
          {WEEKDAYS.map((name, row) => (
            <Row key={row} name={name} row={row} weeks={weeks} days={days} level={level} goal={goal} todayKey={todayKey} />
          ))}
        </div>
      </div>
      <div className="heatmap-legend">
        <span>Ít</span>
        {[0, 1, 2, 3, 4].map((l) => <i key={l} className={`lv${l}`} />)}
        <span>Đạt mục tiêu ({goal})</span>
      </div>
    </div>
  );
}

function Row({ name, row, weeks, days, level, goal, todayKey }: {
  name: string;
  row: number;
  weeks: number;
  days: { key: string; date: Date; count: number; future: boolean }[];
  level: (count: number) => number;
  goal: number;
  todayKey: string;
}) {
  return (
    <>
      <span className="heatmap-day">{name}</span>
      {Array.from({ length: weeks }, (_, w) => {
        const d = days[w * 7 + row];
        if (!d || d.future) return <i key={w} className="heatmap-cell future" />;
        const label = `${d.count} lượt ôn · ${d.date.toLocaleDateString("vi-VN")}${d.count >= goal ? " · đạt mục tiêu" : ""}`;
        return <i key={w} className={`heatmap-cell lv${level(d.count)}${d.key === todayKey ? " today" : ""}`} title={label} aria-label={label} />;
      })}
    </>
  );
}
