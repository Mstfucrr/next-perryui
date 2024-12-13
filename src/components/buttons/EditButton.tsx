import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideEdit } from 'lucide-react'

interface EditButtonProps extends ButtonProps {
  onEdit: () => void
  label?: string
  isIconButton?: boolean
  variant?: ButtonProps['variant']
  className?: string
}

export function EditButton({
  onEdit,
  label,
  isIconButton = false,
  variant = 'outline',
  className,
  ...props
}: EditButtonProps) {
  return (
    <Button
      variant={variant}
      size='sm'
      className={cn('flex items-center gap-1', className)}
      onClick={onEdit}
      {...props}
    >
      <LucideEdit className='h-4 w-4' />
      {!isIconButton && (label ?? 'Düzenle')}
    </Button>
  )
}
