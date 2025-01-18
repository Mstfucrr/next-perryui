'use client'

import Header from '@/components/Header'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import ThemeDropDown from '@/components/ThemeDropDown'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  if (isLoading) return null

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className='relative flex min-h-screen'>
      <Sidebar />
      <ThemeDropDown className='absolute right-5 top-5' />
      <div className='flex min-h-screen flex-1 flex-col'>
        <Header />
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  )
}
