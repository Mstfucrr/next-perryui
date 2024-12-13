import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap hover:scale-105 active:scale-100 rounded-md text-sm transition duration-200 font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80 ease-in-out',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 duration-200 ease-in-out',
        outline:
          'border border-input-dark/50 bg-background hover:border-input-dark rounded-md hover:bg-accent hover:text-accent-foreground duration-300 ease-in-out shadow-md',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70 ease-in-out',
        ghost: 'hover:bg-accent hover:text-accent-foreground ease-in-out',
        link: 'text-primary underline-offset-4 hover:underline ease-in-out'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), isLoading && 'opacity-50')}
        ref={ref}
        {...props}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className='mr-2 size-6 animate-spin' /> : props.children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
