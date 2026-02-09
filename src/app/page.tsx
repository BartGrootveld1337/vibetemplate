import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto max-w-2xl text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl text-primary-foreground">
            ⚡
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Vibe Coding Template
        </h1>

        {/* Description */}
        <p className="mb-8 text-lg text-muted-foreground">
          Next.js 15 + Supabase full-stack template optimized for AI-assisted
          development. Start building your app in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 text-left sm:grid-cols-2">
          <Feature
            icon="🚀"
            title="Ready in Seconds"
            description="Pre-configured with auth, database, and styling. Just add your Supabase keys and go."
          />
          <Feature
            icon="🤖"
            title="AI-First"
            description="AGENTS.md and Cursor rules included for optimal AI-assisted development."
          />
          <Feature
            icon="🔒"
            title="Secure by Default"
            description="Row Level Security, middleware auth, and TypeScript strict mode."
          />
          <Feature
            icon="📦"
            title="Full-Stack"
            description="Auth, database, storage, and realtime - all included with Supabase."
          />
        </div>
      </div>
    </main>
  )
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-2 text-2xl">{icon}</div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
