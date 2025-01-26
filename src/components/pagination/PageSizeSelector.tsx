import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PageSizeSelectorProps {
  pageSizes: number[]
  pageSize: number
  setPageSize: (size: number) => void
}

export function PageSizeSelector({ pageSizes, pageSize, setPageSize }: PageSizeSelectorProps) {
  return (
    <div className='flex items-center'>
      <Select value={String(pageSize)} onValueChange={value => setPageSize(Number(value))}>
        <SelectTrigger className='h-8 w-[130px] text-sm'>
          <SelectValue placeholder='Page Size' />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map(size => (
            <SelectItem key={size} value={String(size)} className='text-sm'>
              <span className='block text-left'>{size} per page</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
