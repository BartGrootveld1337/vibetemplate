# Components AGENTS.md

## Folder Structure

```
components/
├── ui/           # shadcn/ui base components
└── shared/       # Project-specific components
```

## UI Components (`/ui`)

These are shadcn/ui components. Key points:
- **Don't edit directly** — customize via className prop
- Add new components: `pnpm dlx shadcn@latest add [component]`
- Available: Button, Input, Card (add more as needed)

## Shared Components (`/shared`)

Place project-specific reusable components here.

## Component Guidelines

### Basic Component
```tsx
import { cn } from '@/lib/utils'

interface MyComponentProps {
  title: string
  className?: string
}

export function MyComponent({ title, className }: MyComponentProps) {
  return (
    <div className={cn('p-4 rounded-lg border', className)}>
      <h2>{title}</h2>
    </div>
  )
}
```

### Client Component (with interactivity)
```tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}
```

## Naming Conventions

- File: kebab-case (`user-avatar.tsx`)
- Component: PascalCase (`UserAvatar`)
- Props interface: `ComponentNameProps`
- Use named exports, not default

## Styling

- Use Tailwind utility classes
- Use `cn()` for conditional classes
- Mobile-first: base styles → `md:` → `lg:`
- Keep components composable via className prop
