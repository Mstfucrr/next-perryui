import { usePagination } from '@/hooks/usePagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ListHubsInput } from '../api/hub.schema'
import { hubService } from '../api/hubService'

export function useGetHubs() {
  const [hubsParams, setHubsParams] = useState<ListHubsInput>({
    offset: 0,
    limit: 10,
    search: undefined
  })

  const query = useQuery({
    queryKey: ['hubs', hubsParams],
    queryFn: () => hubService.listHubs(hubsParams),
    retry: 2,
    placeholderData: keepPreviousData
  })

  const pagination = usePagination({
    totalCount: query.data?.count ?? 0,
    onPageChange: ({ pageIndex, pageSize }) => {
      const newParams = {
        ...hubsParams,
        offset: pageIndex * pageSize,
        limit: pageSize
      }
      setHubsParams(newParams)
    }
  })

  return {
    ...query,
    hubsParams,
    setHubsParams,
    hubs: query.data?.rows ?? [],
    hubsCount: query.data?.count ?? 0,
    pagination
  }
}
