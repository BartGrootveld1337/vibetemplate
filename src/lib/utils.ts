import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Use this for conditional class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to a human-readable string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

/**
 * Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength - 3)}...`
}

/**
 * Sleep for a given number of milliseconds
 * Useful for testing loading states
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Check if we're running on the server
 */
export const isServer = typeof window === 'undefined'

/**
 * Get the base URL for the application
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}
