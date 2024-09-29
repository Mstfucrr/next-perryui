import { ModeToggle } from '@/components/Theme/ModeToggle'
import React from 'react'

const UnAuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container mx-auto flex flex-col gap-10 py-3'>
      <ModeToggle className='self-end' />
      <h1 className='mt-20 text-center text-4xl text-primary'>You are not authorized to view this page</h1>
      {children}
    </div>
  )
}

export default UnAuthorizedLayout
