'use client'
import Unauthorized from '@/components/Unauthorized'
import { usePermissions } from '@/context/PermissionsContext'
import { NextPage } from 'next'

// Define a type for the allows property
type AllowsType = string[] | string | undefined

export const withAuthorization = (Component: NextPage) => {
  const Wrapper = (props: { [key: string]: any }) => {
    // Specify a more specific type for props
    const permissions = usePermissions()

    if (!permissions) return <p>Loading...</p>

    const allows: AllowsType = Component.allows // Ensure allows is typed correctly

    const isAuthorized = Array.isArray(allows)
      ? allows.some(allow => permissions.includes(allow))
      : allows && permissions.includes(allows)

    if (!isAuthorized) return <Unauthorized />

    return <Component {...props} />
  }

  return Wrapper
}
