-- Migration: Initial Setup
-- Description: Creates profiles table and sets up auth triggers

-- =============================================================================
-- Profiles Table
-- =============================================================================
-- This table extends the auth.users table with additional profile information.
-- It's automatically populated when a new user signs up via the trigger below.

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- =============================================================================
-- RLS Policies
-- =============================================================================

-- Users can view their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- =============================================================================
-- Functions & Triggers
-- =============================================================================

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end;
$$;

-- Trigger to create profile on user signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to handle updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger to update updated_at on profile changes
create or replace trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- =============================================================================
-- Indexes
-- =============================================================================

create index if not exists profiles_email_idx on public.profiles (email);
