'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CustomImage from '@/components/image'

export default function NotFound() {
  return (
    <div className='relative min-h-screen bg-gradient-to-b from-white to-gray-50'>
      <CustomImage
        src='/404.png'
        alt='404'
        className='absolute left-0 top-0 size-full object-cover opacity-25 blur-[1px]'
      />
      <div className='relative flex min-h-screen flex-col items-center justify-center px-4'>
        <div className='flex flex-col items-center space-y-6 text-center'>
          <h1 className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-7xl font-black text-transparent md:text-9xl'>
            404
          </h1>
          <h2 className='text-2xl font-bold text-gray-800 md:text-4xl'>Sayfa Bulunamadı</h2>
          <p className='max-w-md text-pretty rounded-lg bg-white p-2 text-lg font-medium text-gray-700'>
            Aradığınız sayfa mevcut değil. Anasayfaya dönmek için aşağıdaki butonu kullanabilirsiniz.
          </p>
          <Link href='/dashboard'>
            <Button
              className='mt-4 w-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 md:w-auto'
              size='lg'
            >
              Anasayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
