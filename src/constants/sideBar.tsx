import { Role } from '@/modules/auth/types'
import { SidebarGroup } from '@/types/sidebar'
import { LucideSettings, LucideUsers } from 'lucide-react'

const groupedPages: SidebarGroup[] = [
  {
    title: 'Teknik Yönetim',
    icon: <LucideSettings />,
    subMenu: [
      {
        title: 'Algo',
        pages: [
          { name: 'Hub', path: '/technical/algo/hubs' },
          { name: 'Config', path: '/technical/algo/config', allowedRoles: [Role.ADMIN] },
          { name: 'Order', path: '/technical/algo/orders', allowedRoles: [Role.ADMIN] },
          { name: 'Courier', path: '/technical/algo/couriers', allowedRoles: [Role.ADMIN] }
        ]
      },
      {
        title: 'Hub',
        pages: [{ name: 'Hub', path: '/technical/hub/hubs', allowedRoles: [Role.ADMIN] }]
      }
    ]
  },
  {
    title: 'Kullanıcı Yönetimi',
    icon: <LucideUsers />,
    pages: [{ name: 'Kullanıcı Yönetimi', path: '/user-management', allowedRoles: [Role.ADMIN, Role.USER] }]
  }
]

const getAllowedRolesByPath = (path: string | null): Role[] | undefined => {
  if (!path) return undefined
  for (const group of groupedPages) {
    // Kontrol et subMenu varsa
    if (group.subMenu) {
      for (const sub of group.subMenu) {
        const page = sub.pages.find(p => p.path === path)
        if (page) {
          return page.allowedRoles
        }
      }
    }
    // Kontrol et ana sayfalar
    const page = group.pages?.find(p => p.path === path)
    if (page) return page.allowedRoles
  }
  return undefined // Eğer yol bulunamazsa
}

export { getAllowedRolesByPath, groupedPages }
