import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const startTime = Date.now()

  // Check Supabase connection
  let supabaseStatus = 'unknown'
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('profiles').select('count').limit(1)
    supabaseStatus = error ? 'error' : 'healthy'
  } catch {
    supabaseStatus = 'error'
  }

  const responseTime = Date.now() - startTime

  return NextResponse.json({
    status: supabaseStatus === 'healthy' ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    responseTime: `${responseTime}ms`,
    services: {
      supabase: supabaseStatus,
    },
    version: process.env.npm_package_version || '1.0.0',
  })
}
