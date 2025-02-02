import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/usePagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PageSizeSelector } from './PageSizeSelector'
import { PageNumberButton } from './PaginationButtons'

interface GlobalPaginationProps {
  pagination: ReturnType<typeof usePagination>
  isIconOnly?: boolean
  isLoading?: boolean
}

export function GlobalPagination({ pagination, isIconOnly = true, isLoading = false }: GlobalPaginationProps) {
  const {
    pageIndex,
    pageSize,
    pageCount,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageSizes,
    setPageIndex,
    setPageSize
  } = pagination
  return (
    <div className={`flex flex-wrap items-center gap-3 border-t pt-4 max-sm:justify-center`}>
      <div className='flex items-center gap-2'>
        <Button
          onClick={previousPage}
          disabled={!canPreviousPage || isLoading}
          variant='outline'
          size='xs'
          className='flex items-center gap-1 bg-background text-foreground hover:bg-accent disabled:opacity-50'
        >
          <ChevronLeft className='h-4 w-4' />
          {!isIconOnly && <span className='text-sm max-md:hidden'>Previous</span>}
        </Button>
        <div className='flex items-center gap-2'>
          {Array.from({ length: pageCount }, (_, i) => (
            <PageNumberButton
              key={i}
              pageNumber={i}
              currentPage={pageIndex}
              pageCount={pageCount}
              onClick={() => setPageIndex(i)}
            />
          ))}
        </div>
        <Button
          onClick={nextPage}
          disabled={!canNextPage || isLoading}
          variant='outline'
          size='xs'
          className='flex items-center gap-1 bg-background text-foreground hover:bg-accent disabled:opacity-50'
        >
          {!isIconOnly && <span className='text-sm max-md:hidden'>Next</span>}
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
      <PageSizeSelector pageSizes={pageSizes} pageSize={pageSize} setPageSize={setPageSize} />
    </div>
  )
}
