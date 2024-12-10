'use client'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div className='container mx-auto flex w-full flex-col'>
      Dashboard <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
