import { useState } from 'react'
import { usePagination } from './usePagination'

interface UseFilteredPaginationProps<T extends Record<string, unknown>> {
  totalCount: number
  initialParams?: T
  onParamsChange?: (params: T) => void
  initialPageSize?: number
  pageSizes?: number[]
}

export function useFilteredPagination<T extends Record<string, unknown>>({
  totalCount,
  initialParams = {} as T,
  onParamsChange,
  initialPageSize = 10,
  pageSizes = [10, 20, 50, 100]
}: UseFilteredPaginationProps<T>) {
  const [params, setParams] = useState<T>(initialParams)

  const pagination = usePagination({
    totalCount,
    onPageChange: ({ pageIndex, pageSize }) => {
      const newParams = {
        ...params,
        offset: pageIndex * pageSize,
        limit: pageSize
      }
      setParams(newParams)
      onParamsChange?.(newParams)
    },
    initialPageSize,
    pageSizes
  })

  const handleFilterChange = (key: keyof T, value: unknown) => {
    const newParams = { ...params, [key]: value }
    setParams(newParams)
    onParamsChange?.(newParams)
  }

  return {
    params,
    setParams,
    pagination,
    handleFilterChange
  }
}
