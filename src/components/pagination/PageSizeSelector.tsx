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
        <SelectTrigger className='border-customColors-gray h-8 w-[130px] bg-background text-sm text-foreground hover:bg-accent'>
          <SelectValue placeholder='Page Size' />
        </SelectTrigger>
        <SelectContent className='border-customColors-gray bg-background'>
          {pageSizes.map(size => (
            <SelectItem key={size} value={String(size)} className='text-sm hover:bg-[#3A3B3C]'>
              <span className='block text-left text-foreground'>{size} per page</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
