'use client'

import { authService, ILoginRequest } from '@/services/api/auth'
import { ICurrentUserInfo } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'

interface IAuthContext {
  isLoading: boolean
  user: ICurrentUserInfo | null
  login: (user: ILoginRequest) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ICurrentUserInfo | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const queryClient = useQueryClient()

  const {
    data: userData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getUser(),
    retry: false
  })

  useEffect(() => {
    console.log('userData', userData, error, isLoading)
    if (isLoading) return
    if (error) {
      setUser(null)
      setIsAuthenticated(false)
    }
    if (!userData) return
    setUser(userData.data)
    setIsAuthenticated(true)
  }, [error, isLoading, userData])

  const { mutate: loginMutation } = useMutation({
    mutationFn: (user: ILoginRequest) => authService.login(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })

  const login = async (user: ILoginRequest) => {
    loginMutation(user)
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
