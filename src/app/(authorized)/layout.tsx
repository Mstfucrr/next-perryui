import Header from '@/components/Header'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col py-2'>
      <Header />
      {children}
    </div>
  )
}
