import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Vibe Coding Template',
    template: '%s | Vibe Coding Template',
  },
  description:
    'Next.js 15 + Supabase full-stack template optimized for AI-assisted development',
  keywords: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Template'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Vibe Coding Template',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
