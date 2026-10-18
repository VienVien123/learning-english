-- TV-English grammar progress
-- Run once in Supabase -> SQL Editor. Safe to re-run.
-- One row per user and grammar topic: best practice score and when the topic was last studied.

create table if not exists public.grammar_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null check (char_length(topic_id) between 1 and 80),
  best_score integer not null default 0 check (best_score between 0 and 100),
  last_score integer not null default 0 check (last_score between 0 and 100),
  attempts integer not null default 0 check (attempts >= 0),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

alter table public.grammar_progress enable row level security;

drop policy if exists "Users can view own grammar progress" on public.grammar_progress;
create policy "Users can view own grammar progress"
on public.grammar_progress for select
using (auth.uid() = user_id);

drop policy if exists "Users can create own grammar progress" on public.grammar_progress;
create policy "Users can create own grammar progress"
on public.grammar_progress for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own grammar progress" on public.grammar_progress;
create policy "Users can update own grammar progress"
on public.grammar_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own grammar progress" on public.grammar_progress;
create policy "Users can delete own grammar progress"
on public.grammar_progress for delete
using (auth.uid() = user_id);
