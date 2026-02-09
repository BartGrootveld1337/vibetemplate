import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from './sign-out-button'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening with your account.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value="1" change="+100%" />
          <StatCard title="Active Sessions" value="1" change="Active" />
          <StatCard title="Storage Used" value="0 MB" change="0%" />
          <StatCard title="API Calls" value="0" change="This month" />
        </div>

        {/* User Info Card */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Account Information</h2>
          <dl className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="text-sm font-medium text-muted-foreground sm:w-32">
                User ID
              </dt>
              <dd className="font-mono text-sm">{user.id}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="text-sm font-medium text-muted-foreground sm:w-32">
                Email
              </dt>
              <dd className="text-sm">{user.email}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="text-sm font-medium text-muted-foreground sm:w-32">
                Provider
              </dt>
              <dd className="text-sm capitalize">
                {user.app_metadata.provider || 'email'}
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="text-sm font-medium text-muted-foreground sm:w-32">
                Created
              </dt>
              <dd className="text-sm">
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              icon="📝"
              title="Edit Profile"
              description="Update your account information"
            />
            <ActionCard
              icon="🔐"
              title="Security Settings"
              description="Manage your security preferences"
            />
            <ActionCard
              icon="📊"
              title="View Analytics"
              description="See your usage statistics"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string
  value: string
  change: string
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{change}</p>
    </div>
  )
}

function ActionCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <button className="rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent">
      <div className="mb-2 text-2xl">{icon}</div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </button>
  )
}
