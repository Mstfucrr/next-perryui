import { Hub } from '@/modules/hub/types'
import type { NextApiRequest, NextApiResponse } from 'next'

type PaginatedResponse<T> = {
  rows: T[]
  count: number
}

const generateRandomDate = () => {
  const start = new Date('2024-01-01')
  const end = new Date()
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const hubs: Hub[] = Array.from({ length: 55 }, (_, i) => ({
  id: `hub-${i + 1}`,
  name: `Hub ${i + 1}`,
  location: `Location ${i + 1}`,
  createdAt: generateRandomDate().toISOString()
}))

export default async function handler(req: NextApiRequest, res: NextApiResponse<PaginatedResponse<Hub>>) {
  const { limit = 10, offset = 0, sort = 'asc', key, value } = req.query

  const parsedLimit = parseInt(limit as string, 10)
  const parsedOffset = parseInt(offset as string, 10)

  let hubsData = [...hubs]

  // Güvenli key ve value kontrolü
  if (key && value && typeof key === 'string' && typeof value === 'string') {
    hubsData = hubsData.filter(hub => {
      const fieldValue = hub[key as keyof Hub]
      return typeof fieldValue === 'string' && fieldValue.includes(value)
    })
  }

  if (sort === 'desc') {
    hubsData = hubsData.reverse()
  }

  const paginatedHubs = hubsData.slice(parsedOffset, parsedOffset + parsedLimit)

  res.status(200).json({
    rows: paginatedHubs,
    count: hubsData.length
  })
}
