import React, { useState } from 'react'
import { LucideSettings, SidebarCloseIcon, SidebarOpenIcon } from 'lucide-react'
import { Button } from '../ui/button'
import CustomImage from '../image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

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

type SidebarHeaderProps = {
  isOpen: boolean
  toggleSidebar: () => void
}

const SidebarHeader = ({ isOpen, toggleSidebar }: SidebarHeaderProps) => (
  <div className='relative flex h-16 w-full items-center justify-between gap-5'>
    {isOpen && (
      <Link href='/dashboard' className='flex w-full items-center gap-5'>
        <CustomImage src='/logo.png' alt='logo' className='size-14' />
        <h1 className='text-nowrap text-2xl font-bold text-primary'>PERRY UI</h1>
      </Link>
    )}
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleSidebar}
      className={cn('absolute bg-white text-primary', isOpen ? '-right-10' : '-right-14')}
    >
      {isOpen ? <SidebarCloseIcon className='size-7' /> : <SidebarOpenIcon className='size-7' />}
    </Button>
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
      <h2 className='text-lg font-bold text-gray-600'>{group.title}</h2>
    </div>
    {group.subMenu && (
      <div className='flex flex-col gap-3 pl-4'>
        {group.subMenu.map((subMenu, index) => (
          <div key={index}>
            <h3 className='text-md font-semibold text-gray-500'>{subMenu.title}</h3>
            <div className='mt-1 flex flex-col gap-2 pl-1'>
              {subMenu.pages.map((page, index) => {
                const isActive = pathname.includes(page.path)
                return (
                  <Link href={page.path} key={index} legacyBehavior passHref>
                    <Button
                      variant={isActive ? 'default' : 'secondary'}
                      className={cn(
                        'w-full justify-start border-2 font-semibold hover:border-primary',
                        isActive && 'border-primary text-white',
                        !isActive && 'hover:border-primary hover:text-primary'
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

  return (
    <div
      className={cn(
        'border-r border-gray-300 bg-white transition-all duration-300',
        isOpen ? 'min-h-screen w-64 p-4' : 'w-0'
      )}
    >
      <div className='flex flex-col gap-y-10'>
        <SidebarHeader isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        {isOpen && <hr className='w-full border-gray-300' />}
        {isOpen && (
          <div className='flex flex-col gap-5'>
            {groupedPages.map((group, index) => (
              <SidebarGroupComponent key={index} group={group} pathname={pathname} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
