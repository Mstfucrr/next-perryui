import { z } from 'zod'

// ---------------------------- Pagination Schema ---------------------------------

export const limitSchema = z.coerce.number().min(1).max(100).default(10)

export const offsetSchema = z.coerce.number().min(0).default(0)

export const searchSchema = z.object({
  key: z.string().max(255),
  value: z.string().max(255)
})

export const sortSchema = z.enum(['asc', 'desc']).default('desc')

export const paginationSchema = z.object({
  limit: limitSchema.optional(),
  offset: offsetSchema.optional(),
  search: searchSchema.optional(),
  sort: sortSchema.optional()
})

export type PaginationInput = z.infer<typeof paginationSchema>

// --------------------------------------------------------------------------------
