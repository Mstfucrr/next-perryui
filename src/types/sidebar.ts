import { Role } from '@/modules/auth/types'

export type Page = { name: string; path: string; allowedRoles?: Role[] }

export type SubMenu = { title: string; pages: Array<Page> }

export type SidebarGroup = {
  title: string
  icon: React.ReactNode
  subMenu?: Array<SubMenu>
  pages?: Array<Page>
}
