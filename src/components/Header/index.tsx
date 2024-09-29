'use client'

import makeRequest from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ModeToggle } from '../Theme/ModeToggle'
import { Button } from '../ui/button'

type Order = {
  id: number
  name: string
  price: number
}

const Header = () => {
  const { data, error, isLoading } = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => await makeRequest.get<Order[]>('/orders')
  })

  useEffect(() => {
    if (!data) return
    console.log(data)
  }, [data])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='flex flex-col'>
      <ModeToggle className='self-end' />

      <div className='mx-auto grid grid-cols-2 gap-10 text-nowrap p-10 text-2xl font-semibold text-primary'>
        {data?.map(order => (
          <div key={order.id} className='flex items-center gap-4'>
            <p>{order.name}</p>
            <p>{order.price}</p>
            <Button onClick={() => console.log('clicked')} className='text-lg'>
              Click me
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
