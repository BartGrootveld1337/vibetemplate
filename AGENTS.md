# AGENTS.md

## Project Overview

Next.js 16 + Supabase full-stack template optimized for AI-assisted development (vibe-coden).
This template provides a production-ready foundation with authentication, database, and modern tooling.

## Quick Start

```bash
./setup.sh          # First-time setup (configures environment)
pnpm install        # Install dependencies
pnpm dev            # Start development server at http://localhost:3000
```

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm test` | Run unit tests |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `make db-new name=xyz` | Create new database migration |
| `make db-push` | Push migrations to Supabase |
| `pnpm supabase:types` | Regenerate database types |

## Architecture

### Stack
- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, signup, callback)
│   ├── (dashboard)/       # Protected routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── shared/            # Project-specific components
├── lib/
│   ├── supabase/          # Supabase client configuration
│   │   ├── client.ts      # Browser client
│   │   ├── server.ts      # Server client
│   │   └── types.ts       # Generated database types
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
└── types/                 # Shared TypeScript types

supabase/
├── migrations/            # Database migrations
├── config.toml           # Local Supabase config
└── seed.sql              # Development seed data
```

### Data Flow

1. Client Components → Server Actions or API routes
2. Server → Supabase via server client
3. Supabase handles auth, database, storage
4. Realtime updates via Supabase subscriptions (when needed)

## Code Conventions

### General
- TypeScript strict mode — no `any` types
- Functional components with arrow functions
- Named exports (no default exports except pages/layouts)
- File naming: kebab-case for files, PascalCase for components

### Imports
```typescript
// Order: external → internal → types → styles
import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

import type { Profile } from '@/types'
```

### Styling
- Tailwind CSS utility classes
- Use `cn()` helper for conditional classes
- Mobile-first responsive design

## Supabase Patterns

### Client Selection
```typescript
// Browser (client components)
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

// Server (server components, route handlers, server actions)
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
```

### Auth Check
```typescript
const { data: { user } } = await supabase.auth.getUser()
if (!user) redirect('/login')
```

### Database Queries
```typescript
// Select
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single()

// Insert
const { data, error } = await supabase
  .from('table')
  .insert({ column: 'value' })
  .select()
  .single()

// Update
const { data, error } = await supabase
  .from('table')
  .update({ column: 'new_value' })
  .eq('id', id)
```

## Common Tasks

### Add a New Page
1. Create `src/app/[route]/page.tsx`
2. Export default async function
3. Add metadata for SEO:
```typescript
export const metadata = { title: 'Page Title' }
```

### Add a Protected Page
1. Create in `src/app/(dashboard)/[route]/page.tsx`
2. Middleware automatically protects routes in this group

### Add an API Route
1. Create `src/app/api/[name]/route.ts`
2. Export GET/POST/PUT/DELETE handlers
3. Always check auth and validate input

### Add a Database Table
1. `make db-new name=create_table_name`
2. Edit the migration file in `supabase/migrations/`
3. Enable RLS and add policies
4. `make db-push` to apply
5. `pnpm supabase:types` to regenerate types

### Add a Component
- shadcn/ui: `pnpm dlx shadcn@latest add [component]`
- Custom: Create in `src/components/shared/`

## Testing

```bash
pnpm test           # Run all unit tests
pnpm test:watch     # Watch mode
pnpm test:e2e       # End-to-end tests
```

Tests must pass before committing.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

## Don'ts

- ❌ No `console.log` in production code (use proper logging)
- ❌ No hardcoded secrets or API keys
- ❌ No `eslint-disable` without explanation
- ❌ No `any` types — always define proper types
- ❌ No Supabase service role key in client code
- ❌ No tables without Row Level Security

## Additional Context

For more detailed patterns, see:
- `.cursor/rules/` — Cursor-specific rules and templates
- `docs/AUTH_SETUP.md` — OAuth provider configuration
- `docs/DEPLOYMENT.md` — Deployment guides
- `supabase/AGENTS.md` — Database-specific instructions
