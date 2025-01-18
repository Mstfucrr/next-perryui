export type PaginatedResponse<T> = {
  rows: T[]
  count: number
}

export type PaginationInput = {
  offset: number
  limit: number
  sort: 'asc' | 'desc'
  search?: { key: string; value: string }
}
