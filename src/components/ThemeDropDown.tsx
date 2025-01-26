'use client'
import { cn } from '@/lib/utils'
import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

type Theme = 'light' | 'dark' | 'system'

const ThemeIcon = ({ theme }: { theme?: Theme }) => {
  if (theme === 'light') return <SunIcon className='size-4' />
  if (theme === 'dark') return <MoonIcon className='size-4' />
  if (theme === 'system') return <ComputerIcon className='size-4' />
  return null
}

type ThemeDropDownProps = {
  className?: string
}

const themesWithIcons = [
  { theme: 'light', icon: <SunIcon className='size-4' /> },
  { theme: 'dark', icon: <MoonIcon className='size-4' /> },
  { theme: 'system', icon: <ComputerIcon className='size-4' /> }
]

export default function ThemeDropDown({ className }: ThemeDropDownProps) {
  const { theme: currentTheme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='link' size='icon' className={className}>
          <ThemeIcon theme={currentTheme as Theme} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themesWithIcons.map(({ theme, icon }) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme)}
            className={cn(
              'border border-transparent',
              currentTheme === theme
                ? 'bg-primary dark:bg-primary-dark'
                : 'hover:border hover:border-primary hover:bg-primary/10 dark:hover:border-primary-dark'
            )}
          >
            {icon} {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
