import React, { useEffect, useState } from 'react'
import { LucideSettings, SidebarOpenIcon } from 'lucide-react'
import { Button } from '../ui/button'
import CustomImage from '../image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import useMediaQuery from '@/hooks/use-media'

type SidebarGroup = {
  title: string
  icon: React.ReactNode
  subMenu?: Array<{
    title: string
    pages: Array<{ name: string; path: string }>
  }>
  pages?: Array<{ name: string; path: string }>
}

const groupedPages: SidebarGroup[] = [
  {
    title: 'Teknik Yönetim',
    icon: <LucideSettings />,
    subMenu: [
      {
        title: 'Algo',
        pages: [
          { name: 'Hub', path: '/technical/algo/hubs' },
          { name: 'Config', path: '/technical/algo/config' },
          { name: 'Order', path: '/technical/algo/orders' },
          { name: 'Courier', path: '/technical/algo/couriers' }
        ]
      }
    ]
  }
]

const SidebarHeader = () => (
  <div className='relative flex h-16 w-full items-center justify-between gap-5'>
    <Link href='/dashboard' className='flex w-full items-center gap-5'>
      <CustomImage src='/logo.png' alt='logo' className='size-14' />
      <h1 className='text-nowrap text-2xl font-bold text-primary dark:text-primary-dark'>PERRY UI</h1>
    </Link>
  </div>
)

type SidebarGroupComponentProps = {
  group: SidebarGroup
  pathname: string
}

const SidebarGroupComponent = ({ group, pathname }: SidebarGroupComponentProps) => (
  <div className='flex flex-col gap-3'>
    <div className='flex items-center gap-2'>
      {group.icon}
      <h2 className='text-lg font-bold text-gray-600 dark:text-gray-400'>{group.title}</h2>
    </div>
    {group.subMenu && (
      <div className='flex flex-col gap-3 pl-4'>
        {group.subMenu.map((subMenu, index) => (
          <div key={index}>
            <h3 className='text-md font-semibold text-gray-500 dark:text-gray-400'>{subMenu.title}</h3>
            <div className='mt-1 flex flex-col gap-2 pl-1'>
              {subMenu.pages.map((page, index) => {
                const isActive = pathname.includes(page.path)
                return (
                  <Link href={page.path} key={index} legacyBehavior passHref>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={cn(
                        'w-full justify-start border-2 font-semibold hover:border-primary',
                        isActive ? 'border-primary text-white' : 'hover:border-primary hover:text-primary'
                      )}
                    >
                      {page.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )}
    {group.pages && (
      <div className='flex flex-col gap-3 pl-4'>
        {group.pages.map((page, index) => {
          const isActive = pathname === page.path
          return (
            <Link href={page.path} key={index} legacyBehavior passHref>
              <Button
                variant={isActive ? 'default' : 'secondary'}
                className='w-full justify-start border-2 font-semibold hover:border-primary'
              >
                {page.name}
              </Button>
            </Link>
          )
        })}
      </div>
    )}
  </div>
)

export default function Sidebar() {
  const pathname = usePathname() || ''
  const [isOpen, setIsOpen] = useState(true)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

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
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity'
        />
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
          <div className='flex flex-col gap-5'>
            {groupedPages.map((group, index) => (
              <SidebarGroupComponent key={index} group={group} pathname={pathname} />
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant='ghost'
        size='icon'
        onClick={() => setIsOpen(!isOpen)}
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
