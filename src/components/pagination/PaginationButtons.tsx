import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
interface PageNumberButtonProps {
  pageNumber: number
  currentPage: number
  pageCount: number
  onClick: () => void
}

export const PageNumberButton = ({ pageNumber, currentPage, pageCount, onClick }: PageNumberButtonProps) => {
  if (pageNumber === 0 || pageNumber === pageCount - 1 || Math.abs(currentPage - pageNumber) <= 1)
    return (
      <Button
        onClick={onClick}
        variant={currentPage === pageNumber ? 'default' : 'outline'}
        disabled={currentPage === pageNumber}
        size='sm'
        className={cn(
          'h-8 w-8 p-0 text-sm text-foreground hover:bg-accent',
          currentPage === pageNumber && 'cursor-default border-b-2 border-b-accent-dark bg-accent'
        )}
      >
        {pageNumber + 1}
      </Button>
    )
  if (Math.abs(currentPage - pageNumber) === 2)
    return (
      <span key={pageNumber} className='text-gray-500'>
        ...
      </span>
    )
  return null
}
