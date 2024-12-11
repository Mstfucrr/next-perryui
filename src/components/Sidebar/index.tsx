import React, { useState } from 'react'
import { SidebarCloseIcon, SidebarOpenIcon } from 'lucide-react'
import { Button } from '../ui/button'
import CustomImage from '../image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type SidebarGroup = {
  title: string
  pages: Array<{ name: string; path: string }>
}

const groupedPages: SidebarGroup[] = [
  {
    title: 'Portal Yönetimi',
    pages: [
      { name: 'Hub Config Parametreleri', path: '/hub-config' },
      { name: 'Hexagon Bilgileri', path: '/hexagon-info' },
      { name: 'Order Historical Bilgisi', path: '/order-history' }
    ]
  },
  {
    title: 'Teknik Yönetim',
    pages: [
      { name: 'Algoritma Değişiklikleri', path: '/algorithm-changes' },
      { name: 'Cache ve Event Yönetimi', path: '/cache-event-management' }
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={cn(
        'border-r border-gray-300 bg-white transition-all duration-300',
        isOpen ? 'min-h-screen w-64 p-4' : 'w-0'
      )}
    >
      <div className='flex flex-col gap-y-10'>
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
            onClick={() => setIsOpen(!isOpen)}
            className={cn('absolute bg-white text-primary', isOpen ? '-right-10' : '-right-14')}
          >
            {isOpen ? <SidebarCloseIcon className='size-7' /> : <SidebarOpenIcon className='size-7' />}
          </Button>
        </div>

        {isOpen && <hr className='w-full border-gray-300' />}

        {isOpen && (
          <div className='flex flex-col gap-5'>
            {groupedPages.map((group, index) => (
              <div key={index} className='flex flex-col gap-3'>
                <h2 className='text-lg font-bold text-gray-600'>{group.title}</h2>
                <div className='flex flex-col gap-3'>
                  {group.pages.map((page, index) => {
                    const isActive = pathname === page.path
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
      </div>
    </div>
  )
}
