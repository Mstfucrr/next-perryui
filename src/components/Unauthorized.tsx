import { ArrowLeft, ShieldOff } from 'lucide-react'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className='flex min-h-screen items-center justify-center text-foreground transition-colors duration-300 dark:text-foreground-dark'>
      <div className='w-full max-w-4xl p-8 text-center'>
        <ShieldOff className='mx-auto mb-8 h-32 w-32 animate-pulse text-destructive dark:text-destructive-dark' />
        <h1 className='mb-4 text-6xl font-extrabold'>401</h1>
        <h2 className='mb-8 text-4xl font-bold'>Yetkisiz Erişim</h2>
        <p className='mb-12 text-xl'>
          Üzgünüz, bu sayfayı görüntülemek için gerekli izinlere sahip değilsiniz. Eğer bu bir hata olduğunu
          düşünüyorsanız, lütfen sistem yöneticinizle iletişime geçin.
        </p>
        <Link
          href='/'
          className='inline-flex items-center rounded-lg bg-destructive px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-destructive-dark'
        >
          <ArrowLeft className='mr-2 h-6 w-6' />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
