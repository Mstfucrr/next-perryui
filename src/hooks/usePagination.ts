import { useEffect, useState } from 'react'

interface PaginationState {
  pageIndex: number
  pageSize: number
}

interface UsePaginationProps {
  totalCount: number
  onPageChange?: (state: PaginationState) => void
  initialPageSize?: number
  pageSizes?: number[]
}

export function usePagination({
  totalCount,
  onPageChange,
  initialPageSize = 10,
  pageSizes = [10, 20, 50, 100]
}: UsePaginationProps) {
  const [state, setState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize
  })

  const pageCount = Math.ceil(totalCount / state.pageSize)

  useEffect(() => {
    onPageChange?.(state)
  }, [state.pageIndex, state.pageSize])

  const setPageIndex = (pageIndex: number) => {
    setState(prev => ({ ...prev, pageIndex }))
  }

  const setPageSize = (pageSize: number) => {
    setState(prev => ({ ...prev, pageSize, pageIndex: 0 })) // Reset to first page when changing page size
  }

  const nextPage = () => {
    if (state.pageIndex < pageCount - 1) {
      setPageIndex(state.pageIndex + 1)
    }
  }

  const previousPage = () => {
    if (state.pageIndex > 0) {
      setPageIndex(state.pageIndex - 1)
    }
  }

  const canNextPage = state.pageIndex < pageCount - 1
  const canPreviousPage = state.pageIndex > 0

  return {
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    pageCount,
    setPageIndex,
    setPageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageSizes
  }
}
