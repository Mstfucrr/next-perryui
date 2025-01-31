import { Role } from '@/modules/auth/types'

export const isUserAuthorized = (allowedRoles?: Role[], userRole?: Role): boolean => {
  if (!allowedRoles) return true
  return userRole ? allowedRoles.includes(userRole) : false
}
