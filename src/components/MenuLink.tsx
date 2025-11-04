import Link from 'next/link'
import cn from 'classnames'

interface Props {
  href: string
  linkText: string
  isActive: boolean
}

export default function MenuLink({ href, linkText, isActive }: Props) {
  return (
    <Link
      href={href}
      className={cn({
        'text-black': isActive,
        'text-[#7A8699] dark:text-gray-500': !isActive,
      })}
    >
      {linkText}
    </Link>
  )
}
