export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
  errors?: string[]
}

export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export type Status = 'success' | 'error' | 'warning' | 'info'

export interface TableColumn {
  header: string
  accessorKey: string
  sortable?: boolean
  filterable?: boolean
  width?: number
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface AppState {
  isLoading: boolean
  error: string | null
  theme: 'light' | 'dark'
  locale: string
}