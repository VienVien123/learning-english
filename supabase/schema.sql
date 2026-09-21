-- LexiBloom database schema
-- Run in Supabase SQL Editor if you have not already created these tables.

create extension if not exists "pgcrypto";

create table if not exists public.decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  icon text default '📚',
  color text default '#6d5dfc',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vocabularies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  deck_id uuid references public.decks(id) on delete set null,
  word text not null,
  meaning text not null,
  pronunciation text,
  part_of_speech text,
  example text,
  example_translation text,
  note text,
  synonyms text[] default '{}',
  antonyms text[] default '{}',
  tags text[] default '{}',
  image_url text,
  favorite boolean not null default false,
  mastery_level integer not null default 0 check (mastery_level between 0 and 5),
  review_count integer not null default 0,
  correct_count integer not null default 0,
  wrong_count integer not null default 0,
  last_reviewed_at timestamptz,
  next_review_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.review_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  vocabulary_id uuid not null references public.vocabularies(id) on delete cascade,
  rating integer not null check (rating between 0 and 3),
  previous_level integer,
  new_level integer,
  reviewed_at timestamptz not null default now()
);

create index if not exists idx_decks_user on public.decks(user_id);
create index if not exists idx_vocabularies_user on public.vocabularies(user_id);
create index if not exists idx_vocabularies_deck on public.vocabularies(deck_id);
create index if not exists idx_vocabularies_word on public.vocabularies(word);
create index if not exists idx_vocabularies_next_review on public.vocabularies(next_review_at);
create index if not exists idx_review_history_user on public.review_history(user_id);
create index if not exists idx_review_history_vocab on public.review_history(vocabulary_id);

alter table public.decks enable row level security;
alter table public.vocabularies enable row level security;
alter table public.review_history enable row level security;

drop policy if exists "Users can view own decks" on public.decks;
drop policy if exists "Users can create own decks" on public.decks;
drop policy if exists "Users can update own decks" on public.decks;
drop policy if exists "Users can delete own decks" on public.decks;
create policy "Users can view own decks" on public.decks for select using (auth.uid() = user_id);
create policy "Users can create own decks" on public.decks for insert with check (auth.uid() = user_id);
create policy "Users can update own decks" on public.decks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own decks" on public.decks for delete using (auth.uid() = user_id);

drop policy if exists "Users can view own vocabulary" on public.vocabularies;
drop policy if exists "Users can create own vocabulary" on public.vocabularies;
drop policy if exists "Users can update own vocabulary" on public.vocabularies;
drop policy if exists "Users can delete own vocabulary" on public.vocabularies;
create policy "Users can view own vocabulary" on public.vocabularies for select using (auth.uid() = user_id);
create policy "Users can create own vocabulary" on public.vocabularies for insert with check (auth.uid() = user_id);
create policy "Users can update own vocabulary" on public.vocabularies for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own vocabulary" on public.vocabularies for delete using (auth.uid() = user_id);

drop policy if exists "Users can view own reviews" on public.review_history;
drop policy if exists "Users can create own reviews" on public.review_history;
drop policy if exists "Users can delete own reviews" on public.review_history;
create policy "Users can view own reviews" on public.review_history for select using (auth.uid() = user_id);
create policy "Users can create own reviews" on public.review_history for insert with check (auth.uid() = user_id);
create policy "Users can delete own reviews" on public.review_history for delete using (auth.uid() = user_id);

-- Add tables to the Realtime publication (safe to re-run).
do $$ begin
  alter publication supabase_realtime add table public.decks;
exception when duplicate_object then null; end $$;

do $$ begin
  alter publication supabase_realtime add table public.vocabularies;
exception when duplicate_object then null; end $$;

do $$ begin
  alter publication supabase_realtime add table public.review_history;
exception when duplicate_object then null; end $$;
