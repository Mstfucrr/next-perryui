import { cn } from '@/lib/utils'
import { FC } from 'react'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const Loading: FC<LoadingProps> = ({ size = 'medium', color = '#3b82f6' }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div
        className={cn(
          'h-10 w-10 animate-spin rounded-full border-t-4 border-t-blue-500',
          size === 'small' && 'h-6 w-6',
          size === 'large' && 'h-14 w-14'
        )}
        style={{ borderTopColor: color }}
      />
    </div>
  )
}

export default Loading
