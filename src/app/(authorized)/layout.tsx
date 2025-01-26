'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  if (isLoading) return null

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex min-h-screen flex-1 flex-col'>
        <Header />
        <div className='flex-1 px-4'>{children}</div>
      </div>
    </div>
  )
}
