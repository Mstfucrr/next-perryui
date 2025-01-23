'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const PermissionsContext = createContext<string[] | null>(null)

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [permissions, setPermissions] = useState<string[]>([]) // Initialize with your permissions logic

  useEffect(() => {
    if (!user) return
    setPermissions(user.permissions)
  }, [user])

  return <PermissionsContext.Provider value={permissions}>{children}</PermissionsContext.Provider>
}

export const usePermissions = () => {
  const context = useContext(PermissionsContext)
  if (!context) throw new Error('usePermissions must be used within a PermissionsProvider')
  return context
}
