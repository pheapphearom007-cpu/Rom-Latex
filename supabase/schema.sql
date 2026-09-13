-- ROM LATEX — Supabase PostgreSQL schema
-- Apply this file in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query).
-- Uses Row Level Security (RLS) so users can only read and mutate their own data.

create extension if not exists "pgcrypto";

-- 1. User Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null default '',
  bio text not null default '',
  theme text not null default 'system',
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. User Progress Summary (Full synced state for seamless cross-device learning)
create table if not exists public.user_progress_summary (
  user_id uuid primary key references auth.users on delete cascade,
  completed_lesson_ids text[] not null default '{}',
  completed_exercise_ids text[] not null default '{}',
  exercise_attempts jsonb not null default '{}'::jsonb,
  bookmarks jsonb not null default '[]'::jsonb,
  unlocked_achievement_ids text[] not null default '{}',
  current_course_id text not null default 'fundamentals',
  last_lesson_id text default 'l01',
  streak int not null default 0,
  last_active_date text,
  total_seconds int not null default 0,
  activity jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 3. Granular Progress Per Lesson
create table if not exists public.user_progress (
  user_id uuid not null references auth.users on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  seconds_spent int not null default 0,
  primary key (user_id, lesson_id)
);

-- 4. Exercise Attempts
create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  exercise_id text not null,
  correct boolean not null,
  answer text,
  attempted_at timestamptz not null default now()
);

-- 5. Bookmarks
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  target_type text not null,
  target_id text not null,
  title text not null,
  href text not null,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

-- 6. Achievements
create table if not exists public.user_achievements (
  user_id uuid not null references auth.users on delete cascade,
  achievement_id text not null,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

-- Indexes for optimal query performance
create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists exercise_attempts_user_id_idx on public.exercise_attempts(user_id);
create index if not exists bookmarks_user_id_idx on public.bookmarks(user_id);
create index if not exists user_achievements_user_id_idx on public.user_achievements(user_id);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.user_progress_summary enable row level security;
alter table public.user_progress enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.bookmarks enable row level security;
alter table public.user_achievements enable row level security;

-- Drop any existing conflicting policies
drop policy if exists "Users read own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users insert own profile" on public.profiles;

drop policy if exists "Users read own progress summary" on public.user_progress_summary;
drop policy if exists "Users insert own progress summary" on public.user_progress_summary;
drop policy if exists "Users update own progress summary" on public.user_progress_summary;

drop policy if exists "Users read own progress" on public.user_progress;
drop policy if exists "Users write own progress" on public.user_progress;
drop policy if exists "Users update own progress" on public.user_progress;

drop policy if exists "Users read own attempts" on public.exercise_attempts;
drop policy if exists "Users insert own attempts" on public.exercise_attempts;

drop policy if exists "Users read own bookmarks" on public.bookmarks;
drop policy if exists "Users insert own bookmarks" on public.bookmarks;
drop policy if exists "Users delete own bookmarks" on public.bookmarks;

drop policy if exists "Users read own achievements" on public.user_achievements;
drop policy if exists "Users insert own achievements" on public.user_achievements;

-- Profiles policies
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Progress summary policies
create policy "Users read own progress summary" on public.user_progress_summary for select using (auth.uid() = user_id);
create policy "Users insert own progress summary" on public.user_progress_summary for insert with check (auth.uid() = user_id);
create policy "Users update own progress summary" on public.user_progress_summary for update using (auth.uid() = user_id);

-- User progress policies
create policy "Users read own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users write own progress" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users update own progress" on public.user_progress for update using (auth.uid() = user_id);

-- Exercise attempts policies
create policy "Users read own attempts" on public.exercise_attempts for select using (auth.uid() = user_id);
create policy "Users insert own attempts" on public.exercise_attempts for insert with check (auth.uid() = user_id);

-- Bookmarks policies
create policy "Users read own bookmarks" on public.bookmarks for select using (auth.uid() = user_id);
create policy "Users insert own bookmarks" on public.bookmarks for insert with check (auth.uid() = user_id);
create policy "Users delete own bookmarks" on public.bookmarks for delete using (auth.uid() = user_id);

-- Achievements policies
create policy "Users read own achievements" on public.user_achievements for select using (auth.uid() = user_id);
create policy "Users insert own achievements" on public.user_achievements for insert with check (auth.uid() = user_id);

-- Trigger to automatically create user profile and progress summary on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  insert into public.user_progress_summary (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
