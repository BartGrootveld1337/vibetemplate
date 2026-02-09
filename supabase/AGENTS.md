# Supabase AGENTS.md

## Overview

This directory contains Supabase configuration and database migrations.

## Directory Structure

```
supabase/
├── config.toml       # Local development configuration
├── migrations/       # Database migration files
├── seed.sql          # Development seed data
└── functions/        # Edge Functions (optional)
```

## Migrations

### Creating a New Migration

```bash
make db-new name=create_users_table
# or
pnpm supabase migration new create_users_table
```

### Migration File Template

```sql
-- Migration: create_items_table
-- Description: Creates items table for storing user items

-- Create table
create table if not exists public.items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  description text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS (REQUIRED)
alter table public.items enable row level security;

-- RLS Policies
create policy "Users can view own items"
  on public.items for select
  using (auth.uid() = user_id);

create policy "Users can create own items"
  on public.items for insert
  with check (auth.uid() = user_id);

create policy "Users can update own items"
  on public.items for update
  using (auth.uid() = user_id);

create policy "Users can delete own items"
  on public.items for delete
  using (auth.uid() = user_id);

-- Indexes
create index items_user_id_idx on public.items (user_id);

-- Updated at trigger
create trigger handle_items_updated_at
  before update on public.items
  for each row execute function public.handle_updated_at();
```

### Applying Migrations

```bash
make db-push              # Push to remote Supabase
make db-status            # Check migration status
make db-reset             # Reset local database
```

### After Schema Changes

Always regenerate TypeScript types:
```bash
pnpm supabase:types
```

## Row Level Security (RLS)

**ALWAYS enable RLS on new tables.** Never skip this.

### Common RLS Patterns

```sql
-- User owns the row (most common)
create policy "Users can CRUD own data"
  on public.table_name for all
  using (auth.uid() = user_id);

-- Public read, authenticated write
create policy "Anyone can read"
  on public.table_name for select
  using (true);

create policy "Authenticated users can write"
  on public.table_name for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Admin only
create policy "Admins only"
  on public.table_name for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
```

## Edge Functions

Location: `/supabase/functions/[function-name]/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Your logic here

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

Deploy with: `supabase functions deploy function-name`

## Local Development

```bash
supabase start    # Start local Supabase
supabase stop     # Stop local Supabase
supabase status   # Check status and get local URLs
```

## Best Practices

1. **Always enable RLS** — No exceptions
2. **Test policies** — Verify with different user contexts
3. **Use migrations** — Never modify production directly
4. **Regenerate types** — After every schema change
5. **Seed carefully** — Only for development/testing
