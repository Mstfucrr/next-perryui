import React from 'react'

const UnAuthorizedLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-col gap-10 bg-background py-3'>{children}</div>
}

export default UnAuthorizedLayout
