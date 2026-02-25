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
          <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">
            ⚡
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Vibe Coding Template
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-8 text-lg">
          Next.js 16 + Supabase full-stack template optimized for AI-assisted
          development. Start building your app in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {user ? (
            <Link
              href="/dashboard"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-lg px-8 text-sm font-medium transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-lg px-8 text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-lg border px-8 text-sm font-medium transition-colors"
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
    <div className="bg-card rounded-lg border p-6">
      <div className="mb-2 text-2xl">{icon}</div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
