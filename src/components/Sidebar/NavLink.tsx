import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'

type NavLinkProps = {
  children: React.ReactNode
  href: string
  className?: string
  isActive?: boolean
}

const NavLink = ({ children, href, className, isActive, ...props }: NavLinkProps) => {
  return (
    <Link href={href} legacyBehavior passHref>
      <Button
        variant={isActive ? 'default' : 'outline'}
        className={cn(
          'w-full justify-start border-2 font-semibold hover:border-primary',
          isActive ? 'border-primary text-white' : 'hover:border-primary hover:text-primary',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </Link>
  )
}

export default NavLink
