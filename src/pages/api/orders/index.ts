// /app/api/orders/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'

type Order = {
  id: number
  name: string
  price: number
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // Sipariş verilerini almak için gerekli işlemler
    const orders: Order[] = [
      { id: 1, name: 'Sipariş 1', price: 100 },
      { id: 2, name: 'Sipariş 2', price: 200 }
    ]

    return res.status(200).json(orders)
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
