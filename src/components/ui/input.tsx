import * as React from 'react'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  Icon?: LucideIcon
  iconPosition?: 'left' | 'right'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div className='relative'>
        {Icon && iconPosition === 'left' && (
          <Icon size={16} className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' />
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            Icon && iconPosition === 'left' && 'pl-10',
            Icon && iconPosition === 'right' && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <Icon size={16} className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground' />
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
