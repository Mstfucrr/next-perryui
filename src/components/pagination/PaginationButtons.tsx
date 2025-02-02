import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
interface PageNumberButtonProps {
  pageNumber: number
  currentPage: number
  pageCount: number
  onClick: () => void
}

export const PageNumberButton = ({ pageNumber, currentPage, pageCount, onClick }: PageNumberButtonProps) => {
  const isActive = currentPage === pageNumber

  const isFirstPage = pageNumber === 0
  const isLastPage = pageNumber === pageCount - 1
  const isNearFirstPage = Math.abs(currentPage - pageNumber) <= 1

  const isTwoPagesAway = Math.abs(currentPage - pageNumber) === 2

  if (isFirstPage || isLastPage || isNearFirstPage)
    return (
      <Button
        onClick={onClick}
        variant={isActive ? 'default' : 'outline'}
        disabled={isActive}
        size='sm'
        className={cn('h-8 w-8 p-0 text-sm')}
      >
        {pageNumber + 1}
      </Button>
    )
  else if (isTwoPagesAway)
    return (
      <span key={pageNumber} className='text-gray-500'>
        ...
      </span>
    )

  return null
}
