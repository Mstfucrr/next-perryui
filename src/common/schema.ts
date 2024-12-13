import { z } from 'zod'

// ---------------------------- Pagination Schema ---------------------------------

export const limitSchema = z.coerce.number().min(1).max(100).default(10)

export const offsetSchema = z.coerce.number().min(0).default(0)

export const searchSchema = z.string().max(255).optional()

export const sortSchema = z.enum(['asc', 'desc']).default('desc')

export const paginationSchema = z.object({
  limit: limitSchema,
  offset: offsetSchema,
  search: searchSchema,
  sort: sortSchema
})

export type PaginationInput = z.infer<typeof paginationSchema>

// --------------------------------------------------------------------------------
