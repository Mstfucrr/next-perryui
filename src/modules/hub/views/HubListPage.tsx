'use client'

import { GlobalPagination } from '@/components/pagination/GlobalPagination'
import { DataTable } from '@/components/table/data-table'
import { columns } from '../components/columns'
import { useGetHubs } from '../hooks/useGetHubs'

const HubListPage = () => {
  const { hubs, isLoading, error, pagination } = useGetHubs()

  if (error) return <div>Error {JSON.stringify(error)}</div>

  return (
    <div className='container mx-auto py-10'>
      <h1 className='mb-5 text-2xl font-bold'>Hubs</h1>
      <DataTable columns={columns} data={hubs} isLoading={isLoading} />
      <GlobalPagination pagination={pagination} />
    </div>
  )
}

export default HubListPage
