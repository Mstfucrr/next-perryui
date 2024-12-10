'use client'

import Header from '@/components/Header'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  if (isLoading) return null

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className='flex min-h-screen flex-col py-2'>
      <Header />
      <div className='flex-1'>{children}</div>
    </div>
  )
}
