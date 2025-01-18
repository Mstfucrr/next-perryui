'use client'

import { hubService } from '../api/hubService'
import { Hub } from '../types'
import { columns } from '../components/columns'
import { useQuery } from '@tanstack/react-query'

type SearchKey = {
  value: string
  label: string
}

const searchKeys: SearchKey[] = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'location', label: 'Location' }
]

const HubListPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hubs'],
    queryFn: () => hubService.fetchHubs({ offset: 4, limit: 15 }),
    retry: 2
  })

  if (error) return <div>Error {JSON.stringify(error)}</div>
  if (isLoading) return <div>Loading...</div>

  console.log(data)

  return (
    <div className='container mx-auto py-10'>
      <h1 className='mb-5 text-2xl font-bold'>Hubs</h1>

      <ul>{data?.rows.map(hub => <li key={hub.id}>{hub.name}</li>)}</ul>
    </div>
  )
}

export default HubListPage
