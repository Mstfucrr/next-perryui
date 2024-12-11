import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { InputHTMLAttributes, useState } from 'react'
import { Input } from './input'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} {...props} />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
      >
        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
      </button>
    </div>
  )
}
