import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react'

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
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='link' size='icon' className={className}>
          <ThemeIcon theme={theme as Theme} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themesWithIcons.map(({ theme, icon }) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {icon} {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
