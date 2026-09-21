-- LexiBloom gamification migration
-- Run once in Supabase -> SQL Editor.

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp integer not null default 0 check (total_xp >= 0),
  current_streak integer not null default 0 check (current_streak >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  last_active_date date,
  daily_date date,
  daily_answers integer not null default 0 check (daily_answers >= 0),
  daily_correct integer not null default 0 check (daily_correct >= 0),
  game_answers integer not null default 0 check (game_answers >= 0),
  game_correct integer not null default 0 check (game_correct >= 0),
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "Users can view own progress" on public.user_progress;
create policy "Users can view own progress"
on public.user_progress for select
using (auth.uid() = user_id);

drop policy if exists "Users can create own progress" on public.user_progress;
create policy "Users can create own progress"
on public.user_progress for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own progress" on public.user_progress;
create policy "Users can update own progress"
on public.user_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.record_learning_activity(
  p_xp integer default 0,
  p_correct boolean default null,
  p_is_game boolean default false,
  p_local_date date default current_date
)
returns public.user_progress
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_row public.user_progress;
  v_streak integer;
  v_daily_answers integer;
  v_daily_correct integer;
begin
  if v_uid is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.user_progress (user_id, daily_date)
  values (v_uid, p_local_date)
  on conflict (user_id) do nothing;

  select * into v_row
  from public.user_progress
  where user_id = v_uid
  for update;

  if v_row.last_active_date is null then
    v_streak := 1;
  elsif v_row.last_active_date = p_local_date then
    v_streak := v_row.current_streak;
  elsif v_row.last_active_date = p_local_date - 1 then
    v_streak := v_row.current_streak + 1;
  else
    v_streak := 1;
  end if;

  if v_row.daily_date is distinct from p_local_date then
    v_daily_answers := 0;
    v_daily_correct := 0;
  else
    v_daily_answers := v_row.daily_answers;
    v_daily_correct := v_row.daily_correct;
  end if;

  update public.user_progress
  set
    total_xp = total_xp + greatest(coalesce(p_xp, 0), 0),
    current_streak = v_streak,
    best_streak = greatest(best_streak, v_streak),
    last_active_date = p_local_date,
    daily_date = p_local_date,
    daily_answers = v_daily_answers + case when p_correct is null then 0 else 1 end,
    daily_correct = v_daily_correct + case when p_correct is true then 1 else 0 end,
    game_answers = game_answers + case when p_is_game and p_correct is not null then 1 else 0 end,
    game_correct = game_correct + case when p_is_game and p_correct is true then 1 else 0 end,
    updated_at = now()
  where user_id = v_uid
  returning * into v_row;

  return v_row;
end;
$$;

revoke all on function public.record_learning_activity(integer, boolean, boolean, date) from public;
grant execute on function public.record_learning_activity(integer, boolean, boolean, date) to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.user_progress;
exception
  when duplicate_object then null;
end $$;
