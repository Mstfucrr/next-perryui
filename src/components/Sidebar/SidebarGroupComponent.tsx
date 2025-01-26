import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'

type SidebarGroup = {
  title: string
  icon: React.ReactNode
  subMenu?: Array<{
    title: string
    pages: Array<{ name: string; path: string }>
  }>
  pages?: Array<{ name: string; path: string }>
}

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
    )}
  </div>
)

export default SidebarGroupComponent
