'use client'

import { authService } from '@/modules/auth/services/api/auth'
import { ICurrentUserInfo, ILoginRequest } from '@/modules/auth/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface IAuthContext {
  isLoading: boolean
  user: ICurrentUserInfo | null
  login: (user: ILoginRequest) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isPending: boolean
}

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ICurrentUserInfo | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const queryClient = useQueryClient()
  const router = useRouter()
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
    if (isLoading) return
    if (error) {
      setUser(null)
      setIsAuthenticated(false)
    }
    if (!userData) return
    setUser(userData.data)
    setIsAuthenticated(true)
  }, [error, isLoading, userData])

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (user: ILoginRequest) => authService.login(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.dismiss()
      toast.success('Giriş yapıldı. Yönlendiriliyorsunuz...')
      router.push('/dashboard')
    },
    onError: () => {
      toast.dismiss()
      toast.error('Giriş yaparken bir hata oluştu. Lütfen tekrar deneyiniz.')
    },
    onMutate: () => {
      toast.loading('Giriş yapılıyor...')
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
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading, isPending }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
