import Link from 'next/link'
import CustomImage from '../image'

const SidebarHeader = () => (
  <div className='relative flex h-16 w-full items-center justify-between gap-5'>
    <Link href='/dashboard' className='flex w-full items-center gap-5'>
      <CustomImage src='/logo.png' alt='logo' className='size-14' />
      <h1 className='text-nowrap text-2xl font-bold text-primary dark:text-primary-dark'>PERRY UI</h1>
    </Link>
  </div>
)

export default SidebarHeader
