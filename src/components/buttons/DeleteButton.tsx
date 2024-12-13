import { Button, ButtonProps } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LucideTrash2 } from 'lucide-react'

interface DeleteButtonProps extends ButtonProps {
  onDelete: () => void
  label?: string
  isIconButton?: boolean
}

export function DeleteButton({ onDelete, label, isIconButton = false, ...props }: DeleteButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='destructive' size='sm' className='flex items-center gap-1' {...props}>
          <LucideTrash2 className='h-4 w-4' />
          {!isIconButton && (label ?? 'Sil')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-4'>
        <div className='flex flex-col gap-3'>
          <p className='text-sm font-medium'>Silmek istediğinizden emin misiniz?</p>
          <div className='flex justify-end gap-2'>
            <Button variant='destructive' size='sm' onClick={() => onDelete()}>
              Evet
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
