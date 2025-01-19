import { paginationSchema } from '@/common/schema'
import { z } from 'zod'

export const listHubsSchema = paginationSchema

export type ListHubsInput = z.infer<typeof listHubsSchema>
