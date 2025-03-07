'use client'
import Unauthorized from '@/components/Unauthorized'
import { getAllowedRolesByPath } from '@/constants/sideBar'
import { useAuth } from '@/context/AuthContext'
import { isUserAuthorized } from '@/utils/authorization'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

export const withAuthorization = (Component: NextPage) => {
  const Wrapper = (props: ComponentProps<NextPage>) => {
    const { user } = useAuth()
    const pathname = usePathname()

    if (!user) return <p>Loading...</p>

    const currentPathRoles = getAllowedRolesByPath(pathname)

    const isAllowed = isUserAuthorized(currentPathRoles, user?.role)

    if (!isAllowed) return <Unauthorized />

    return <Component {...props} />
  }

  return Wrapper
}
