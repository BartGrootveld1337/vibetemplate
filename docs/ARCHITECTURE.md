# Architecture Overview

This document explains the architectural decisions and patterns used in this template.

## Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                           │
│  Next.js 16 (App Router) + React 19 + TypeScript       │
│  Tailwind CSS + shadcn/ui                              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Middleware                           │
│  Authentication + Route Protection                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     Supabase                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │  Auth   │ │Database │ │ Storage │ │Realtime │      │
│  │         │ │(Postgres)│ │         │ │         │      │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘      │
└─────────────────────────────────────────────────────────┘
```

## Why These Choices?

### Next.js 16 with App Router

- **Server Components by default** — Better performance, simpler data fetching
- **Built-in API routes** — No separate backend needed
- **Turbopack** — Faster development builds
- **Streaming & Suspense** — Improved loading UX

### Supabase

- **All-in-one backend** — Auth, database, storage, realtime
- **PostgreSQL** — Mature, reliable, with full SQL support
- **Row Level Security** — Database-level access control
- **TypeScript support** — Generated types for type-safe queries

### TypeScript (Strict Mode)

- **Catch errors early** — Before they reach production
- **Better AI assistance** — Types help AI generate correct code
- **Self-documenting** — Types serve as documentation

### Tailwind CSS 4

- **Utility-first** — Fast iteration, consistent design
- **AI-friendly** — LLMs excel at generating Tailwind classes
- **Tree-shaking** — Only ship CSS you use

## Data Flow

### Server Components (Default Path)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│   Server    │────▶│  Supabase   │
│             │     │  Component  │     │             │
│             │◀────│  (renders)  │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
         HTML with data
```

### Client Components (Interactive)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│   Server    │────▶│  Supabase   │
│  (hydrated) │     │  Action/API │     │             │
│             │◀────│             │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
           JSON response
```

## Authentication Flow

```
1. User visits protected route
          │
          ▼
2. Middleware checks session
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
3a. Valid    3b. Invalid
    │           │
    ▼           ▼
4a. Allow    4b. Redirect
    access      to /login
```

### Session Management

- Supabase handles JWT tokens
- Middleware refreshes sessions on each request
- Server client uses cookies for auth state
- Client uses browser storage

## Database Patterns

### Row Level Security (RLS)

Every table has RLS enabled. Common patterns:

```sql
-- User can only access their own data
policy "Users own their data"
  on table_name
  for all
  using (auth.uid() = user_id);
```

### Profiles Pattern

```
┌──────────────┐         ┌──────────────┐
│  auth.users  │────────▶│   profiles   │
│  (Supabase)  │  1:1    │  (custom)    │
└──────────────┘         └──────────────┘
```

- `auth.users` — Managed by Supabase (email, password, etc.)
- `profiles` — Our custom data (name, avatar, settings)
- Trigger auto-creates profile on signup

## File Organization

### Feature-Based Structure

For larger apps, consider feature-based organization:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── actions/
│   ├── dashboard/
│   │   ├── components/
│   │   └── hooks/
│   └── settings/
└── shared/
    ├── components/
    └── hooks/
```

### Current Structure (Simple)

Good for small-medium apps:

```
src/
├── app/          # Routes
├── components/   # All components
├── lib/          # Utilities
├── hooks/        # All hooks
└── types/        # All types
```

## Error Handling

### Server-Side

```typescript
export async function GET() {
  try {
    const { data, error } = await supabase.from('table').select()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
```

### Client-Side

```typescript
const { data, error } = await supabase.from('table').select()
if (error) {
  toast.error('Failed to load data')
  return
}
```

## Security Considerations

1. **Environment Variables**
   - `NEXT_PUBLIC_*` — Safe for client
   - Everything else — Server only

2. **Service Role Key**
   - Never expose to client
   - Only use in server-side code
   - Only for admin operations

3. **Input Validation**
   - Always validate user input
   - Use Zod or similar for schemas

4. **RLS**
   - Enable on ALL tables
   - Test policies thoroughly

## Performance Optimizations

1. **Server Components** — Reduce client JS bundle
2. **Streaming** — Show content progressively
3. **Image Optimization** — Use next/image
4. **Code Splitting** — Automatic with App Router
5. **Caching** — Use Next.js caching strategies

## Scalability Path

As your app grows:

1. **Add caching layer** — Redis for sessions/cache
2. **Separate concerns** — Move to microservices if needed
3. **CDN** — Vercel Edge or Cloudflare
4. **Database scaling** — Supabase supports read replicas
5. **Background jobs** — Inngest, Trigger.dev, or Supabase Edge Functions
