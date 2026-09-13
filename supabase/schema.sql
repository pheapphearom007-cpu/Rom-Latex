-- Learn LaTeX — Supabase PostgreSQL schema
-- Apply in the Supabase SQL editor. Uses RLS so users only mutate their own data.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null default '',
  bio text not null default '',
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id text primary key,
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  level int not null,
  difficulty text not null,
  estimated_hours numeric,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id text primary key,
  course_id text not null references public.courses(id) on delete cascade,
  slug text not null,
  number int not null,
  title text not null,
  description text,
  difficulty text not null,
  estimated_minutes int not null default 12,
  content jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  unique (course_id, slug)
);

create table if not exists public.lesson_sections (
  id text primary key,
  lesson_id text not null references public.lessons(id) on delete cascade,
  title text not null,
  section_type text not null,
  body text,
  code text,
  sort_order int not null default 0
);

create table if not exists public.exercises (
  id text primary key,
  lesson_id text not null references public.lessons(id) on delete cascade,
  title text not null,
  prompt text not null,
  type text not null,
  accepted_answers text[] not null default '{}',
  starter_code text,
  explanation text,
  difficulty text not null default 'beginner'
);

create table if not exists public.exercise_options (
  id text primary key,
  exercise_id text not null references public.exercises(id) on delete cascade,
  label text not null,
  text text not null
);

create table if not exists public.user_progress (
  user_id uuid not null references auth.users on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  seconds_spent int not null default 0,
  primary key (user_id, lesson_id)
);

create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  exercise_id text not null references public.exercises(id) on delete cascade,
  correct boolean not null,
  answer text,
  attempted_at timestamptz not null default now()
);

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

create table if not exists public.achievements (
  id text primary key,
  title text not null,
  description text not null,
  icon text
);

create table if not exists public.user_achievements (
  user_id uuid not null references auth.users on delete cascade,
  achievement_id text not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

create index if not exists lessons_course_id_idx on public.lessons(course_id);
create index if not exists exercises_lesson_id_idx on public.exercises(lesson_id);
create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists exercise_attempts_user_id_idx on public.exercise_attempts(user_id);
create index if not exists bookmarks_user_id_idx on public.bookmarks(user_id);

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.bookmarks enable row level security;
alter table public.user_achievements enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_sections enable row level security;
alter table public.exercises enable row level security;
alter table public.exercise_options enable row level security;
alter table public.achievements enable row level security;

create policy "Public curriculum is readable" on public.courses for select using (published = true);
create policy "Public lessons are readable" on public.lessons for select using (published = true);
create policy "Public sections are readable" on public.lesson_sections for select using (true);
create policy "Public exercises are readable" on public.exercises for select using (true);
create policy "Public options are readable" on public.exercise_options for select using (true);
create policy "Achievements are readable" on public.achievements for select using (true);

create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users read own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users write own progress" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users update own progress" on public.user_progress for update using (auth.uid() = user_id);

create policy "Users read own attempts" on public.exercise_attempts for select using (auth.uid() = user_id);
create policy "Users insert own attempts" on public.exercise_attempts for insert with check (auth.uid() = user_id);

create policy "Users read own bookmarks" on public.bookmarks for select using (auth.uid() = user_id);
create policy "Users insert own bookmarks" on public.bookmarks for insert with check (auth.uid() = user_id);
create policy "Users delete own bookmarks" on public.bookmarks for delete using (auth.uid() = user_id);

create policy "Users read own achievements" on public.user_achievements for select using (auth.uid() = user_id);
create policy "Users insert own achievements" on public.user_achievements for insert with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
