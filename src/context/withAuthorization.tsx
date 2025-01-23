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
    if (allows && Array.isArray(allows)) {
      if (!allows.some(allow => permissions.includes(allow))) return <Unauthorized />
    } else if (allows && typeof allows === 'string') {
      if (!permissions.includes(allows)) return <Unauthorized />
    }

    return <Component {...props} />
  }

  return Wrapper
}
