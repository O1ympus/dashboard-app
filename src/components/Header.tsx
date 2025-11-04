'use client'

import Link from 'next/link'
import { navigationData } from '@/shared/data/navigation.data'
import MenuLink from '@/components/MenuLink'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import { useDashboardStore } from '@/stores/DashboardStore'

export default function Header() {
  const pathname = usePathname()
  const currentDashboard = useDashboardStore(state => state.currentDashboard)

  return (
    <header
      className={`sm:w-20dark:bg-[#1E1E1E] lg: mx-auto mb-9 flex h-[60px] items-center border-b border-[#E9EBF0] bg-[#F7F8FA] p-4 sm:h-20 sm:p-8 lg:justify-between 2xl:justify-center`}
    >
      <div className={`flex w-full max-w-[1536px] items-center lg:gap-x-6`}>
        <nav className={`mr-4 flex w-full items-center justify-between lg:mx-auto`}>
          <Link
            href={currentDashboard?._id ? `/dashboards/${encodeURIComponent(currentDashboard._id)}` : '/'}
            className={`text-black`}
          >
            {currentDashboard?.name || 'DASHBOARD'}
          </Link>
          <div className={`align flex items-center gap-8 text-[#7A8699] dark:text-[#F7F8FA]`}>
            {navigationData.map(nav => (
              <MenuLink
                href={nav.href}
                linkText={nav.name}
                key={nav.name}
                isActive={!!match(nav.href)(pathname)}
              />
            ))}
          </div>
        </nav>
        <ThemeToggleButton />
      </div>
    </header>
  )
}
