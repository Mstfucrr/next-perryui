import { Role } from '@/modules/auth/types'
import { SidebarGroup, SubMenu } from '@/types/sidebar'
import { isUserAuthorized } from '@/utils/authorization'
import { usePathname } from 'next/navigation'
import NavLink from './NavLink'

const checkSubMenuIsEmpty = (subMenu?: Array<SubMenu>, userRole?: Role) => {
  if (!subMenu || !userRole) return null

  return subMenu.every(sub => sub.pages.every(page => !isUserAuthorized(page.allowedRoles, userRole)))
}

type SidebarGroupComponentProps = {
  group: SidebarGroup
  userRole?: Role
}

const SidebarGroupComponent = ({ group, userRole }: SidebarGroupComponentProps) => {
  const pathname = usePathname() ?? ''

  if (!userRole) return null

  const isSubMenuGroupEmpty = checkSubMenuIsEmpty(group.subMenu, userRole)

  const isPagesGroupEmpty = group.pages?.every(page => !isUserAuthorized(page.allowedRoles, userRole))

  if ((!isSubMenuGroupEmpty && isPagesGroupEmpty) || (isSubMenuGroupEmpty && !isPagesGroupEmpty)) return null

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        {group.icon}
        <h2 className='text-lg font-bold text-gray-600 dark:text-gray-400'>{group.title}</h2>
      </div>
      {group.subMenu && (
        <div className='flex flex-col gap-3 pl-4'>
          {group.subMenu.map((subMenu, index) => {
            const showSubMenu = subMenu.pages.map(p => isUserAuthorized(p.allowedRoles, userRole)).some(Boolean)
            if (!showSubMenu) return null
            return (
              <div key={index}>
                <h3 className='text-md font-semibold text-gray-500 dark:text-gray-400'>{subMenu.title}</h3>
                <div className='mt-1 flex flex-col gap-2 pl-1'>
                  {subMenu.pages.map((page, index) => {
                    const isActive = pathname.includes(page.path)
                    const isAuthorized = isUserAuthorized(page.allowedRoles, userRole)
                    return (
                      isAuthorized && (
                        <NavLink href={page.path} key={index} isActive={isActive}>
                          {page.name}
                        </NavLink>
                      )
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
      {group.pages && (
        <div className='flex flex-col gap-3 pl-4'>
          {group.pages.map((page, index) => {
            const isActive = pathname === page.path
            const isAuthorized = isUserAuthorized(page.allowedRoles, userRole)
            return (
              isAuthorized && (
                <NavLink href={page.path} key={index} isActive={isActive}>
                  {page.name}
                </NavLink>
              )
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SidebarGroupComponent
