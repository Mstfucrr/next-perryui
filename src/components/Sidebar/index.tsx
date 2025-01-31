import { groupedPages } from '@/constants/sideBar'
import { useAuth } from '@/context/AuthContext'
import useMediaQuery from '@/hooks/use-media'
import { cn } from '@/lib/utils'
import { SidebarOpenIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import SidebarGroupComponent from './SidebarGroupComponent'
import SidebarHeader from './SidebarHeader'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { user } = useAuth()

  const handleToggle = () => setIsOpen(prev => !prev)

  useEffect(() => {
    setIsOpen(isDesktop)
  }, [isDesktop])

  return (
    <div
      className={cn(
        'transition-all duration-500',
        isOpen ? 'w-64' : 'w-0',
        isDesktop ? 'relative' : 'fixed z-40 h-full'
      )}
    >
      {/* Overlay for mobile view */}
      {!isDesktop && isOpen && (
        <div onClick={handleToggle} className='fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity' />
      )}

      <div
        className={cn(
          'relative left-0 top-0 z-50 min-h-screen w-64 origin-left transform border-r border-gray-300 bg-white p-4 transition-all duration-500 dark:border-gray-700 dark:bg-background-dark',
          isOpen ? 'translate-x-0' : '-translate-x-full scale-x-0',
          isDesktop ? 'relative' : 'fixed h-full'
        )}
      >
        <div className='flex flex-col gap-y-10'>
          <SidebarHeader />
          <hr className='w-full border-gray-300 dark:border-gray-700' />
          <div className='flex flex-col gap-8'>
            {groupedPages.map((group, index) => (
              <SidebarGroupComponent key={index} group={group} userRole={user?.role} />
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant='ghost'
        size='icon'
        onClick={handleToggle}
        className={cn(
          'absolute -right-5 top-10 z-50 transform bg-white text-primary transition-all duration-500 dark:bg-background-dark dark:text-primary-dark',
          isOpen ? 'left-[95%]' : 'left-2'
        )}
      >
        <SidebarOpenIcon className={cn('size-7 transition-all duration-500', isOpen ? 'rotate-180' : 'rotate-0')} />
      </Button>
    </div>
  )
}
