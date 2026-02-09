# Source Code AGENTS.md

## Directory Overview

This is the main source code directory for the Next.js application.

## Key Directories

### `/app` - Next.js App Router
- Route handlers and pages
- Layouts and loading states
- API routes in `/api`
- Route groups: `(auth)` for auth pages, `(dashboard)` for protected pages

### `/components` - React Components
- `/ui` - shadcn/ui base components (don't edit directly)
- `/shared` - Project-specific reusable components

### `/lib` - Utilities and Configuration
- `/supabase` - Supabase client setup
- `utils.ts` - Helper functions like `cn()`

### `/hooks` - Custom React Hooks
- Client-side hooks for shared logic
- Always prefix with `use-` (e.g., `use-user.ts`)

### `/types` - TypeScript Types
- Shared type definitions
- Re-exports from Supabase types

## Patterns

### Server vs Client Components
```typescript
// Server Component (default) - can fetch data directly
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component - needs 'use client' directive
'use client'
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState(...)}>Click</button>
}
```

### Import Conventions
Use `@/` prefix for absolute imports:
```typescript
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types'
```
