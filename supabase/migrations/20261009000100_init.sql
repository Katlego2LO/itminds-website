-- IT Minds Institute: initial schema (specification section 6.3 and 6.4).
-- Row Level Security is enabled on every table.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- profiles
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student', 'editor', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('editor', 'admin')
  );
$$;

-- ---------------------------------------------------------------- content
create table public.faculties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text,
  accent_colour text,
  icon text,
  hero_image text,
  sort_order int not null default 0,
  published boolean not null default false
);

create table public.programmes (
  id uuid primary key default gen_random_uuid(),
  faculty_id uuid not null references public.faculties (id) on delete cascade,
  slug text not null,
  name text not null,
  nqf_level smallint check (nqf_level between 1 and 10),
  qualification_type text,
  saqa_id text,
  credits int,
  duration text,
  mode text,
  entry_requirements text,
  curriculum jsonb not null default '[]',
  outcomes jsonb not null default '[]',
  ai_integrated boolean not null default true,
  published boolean not null default false,
  unique (faculty_id, slug)
);

create table public.accreditations (
  id uuid primary key default gen_random_uuid(),
  body text not null check (body in ('QCTO', 'SAQA')),
  reference_number text,
  description text,
  display_order int not null default 0
);

create table public.training_tracks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text
);

create table public.training_courses (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.training_tracks (id) on delete cascade,
  slug text not null unique,
  name text not null,
  audience text,
  duration text,
  delivery_mode text,
  summary text,
  outcomes jsonb not null default '[]',
  partner boolean not null default false,
  published boolean not null default false
);

create table public.business_school_courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text,
  details text,
  published boolean not null default false
);

create table public.student_support_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  sort_order int not null default 0
);

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text,
  cover_image text,
  published_at timestamptz
);

create table public.site_settings (
  key text primary key,
  value jsonb not null
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('general', 'admissions', 'corporate', 'business_school')),
  name text not null,
  email text not null,
  phone text,
  organisation text,
  message text not null,
  source_page text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- autosave
-- Generic per-user draft store used by the autosave hook.
create table public.autosave_drafts (
  user_id uuid not null references auth.users (id) on delete cascade,
  key text not null,
  content jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- ---------------------------------------------------------------- RLS
alter table public.profiles enable row level security;
alter table public.faculties enable row level security;
alter table public.programmes enable row level security;
alter table public.accreditations enable row level security;
alter table public.training_tracks enable row level security;
alter table public.training_courses enable row level security;
alter table public.business_school_courses enable row level security;
alter table public.student_support_services enable row level security;
alter table public.news_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.enquiries enable row level security;
alter table public.autosave_drafts enable row level security;

-- Profiles: read and update your own row; role changes are admin-only (done with the service role).
create policy "profiles_select_own" on public.profiles for select using (id = auth.uid() or public.is_staff());
create policy "profiles_update_own" on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

-- Published content is public; staff can read and write everything.
create policy "faculties_read" on public.faculties for select using (published or public.is_staff());
create policy "faculties_write" on public.faculties for all using (public.is_staff()) with check (public.is_staff());

create policy "programmes_read" on public.programmes for select using (published or public.is_staff());
create policy "programmes_write" on public.programmes for all using (public.is_staff()) with check (public.is_staff());

create policy "training_courses_read" on public.training_courses for select using (published or public.is_staff());
create policy "training_courses_write" on public.training_courses for all using (public.is_staff()) with check (public.is_staff());

create policy "business_school_read" on public.business_school_courses for select using (published or public.is_staff());
create policy "business_school_write" on public.business_school_courses for all using (public.is_staff()) with check (public.is_staff());

create policy "accreditations_read" on public.accreditations for select using (true);
create policy "accreditations_write" on public.accreditations for all using (public.is_staff()) with check (public.is_staff());

create policy "training_tracks_read" on public.training_tracks for select using (true);
create policy "training_tracks_write" on public.training_tracks for all using (public.is_staff()) with check (public.is_staff());

create policy "support_read" on public.student_support_services for select using (true);
create policy "support_write" on public.student_support_services for all using (public.is_staff()) with check (public.is_staff());

create policy "news_read" on public.news_posts for select using (published_at is not null and published_at <= now() or public.is_staff());
create policy "news_write" on public.news_posts for all using (public.is_staff()) with check (public.is_staff());

create policy "settings_read" on public.site_settings for select using (true);
create policy "settings_write" on public.site_settings for all using (public.is_staff()) with check (public.is_staff());

-- Enquiries: no public policy. Inserts go through the validated server route using the service role.
create policy "enquiries_staff_read" on public.enquiries for select using (public.is_staff());
create policy "enquiries_staff_update" on public.enquiries for update using (public.is_staff()) with check (public.is_staff());

-- Autosave drafts: owner only.
create policy "drafts_owner" on public.autosave_drafts for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
