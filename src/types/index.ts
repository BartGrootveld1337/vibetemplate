/**
 * Shared TypeScript types for the application
 */

// Re-export database types for convenience
export type {
  Database,
  Tables,
  InsertTables,
  UpdateTables,
  Profile,
} from '@/lib/supabase/types'

/**
 * API Response wrapper type
 */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

/**
 * Pagination params
 */
export interface PaginationParams {
  page?: number
  limit?: number
  orderBy?: string
  orderDir?: 'asc' | 'desc'
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

/**
 * Server action result type
 */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }
