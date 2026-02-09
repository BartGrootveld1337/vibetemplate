import { describe, expect, it } from 'vitest'

import { cn, formatDate, getInitials, truncate } from '@/lib/utils'

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('handles conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    })

    it('merges tailwind classes correctly', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    })
  })

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date)).toBe('January 15, 2024')
    })

    it('accepts string dates', () => {
      expect(formatDate('2024-06-01')).toBe('June 1, 2024')
    })
  })

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...')
    })

    it('returns short strings unchanged', () => {
      expect(truncate('Hi', 10)).toBe('Hi')
    })
  })

  describe('getInitials', () => {
    it('returns initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD')
    })

    it('handles single names', () => {
      expect(getInitials('John')).toBe('J')
    })

    it('returns ? for null/undefined', () => {
      expect(getInitials(null)).toBe('?')
      expect(getInitials(undefined)).toBe('?')
    })

    it('limits to 2 characters', () => {
      expect(getInitials('John Paul Jones')).toBe('JP')
    })
  })
})
