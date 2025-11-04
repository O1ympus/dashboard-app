'use client'

import SearchBar from '@/components/SearchBar'
import Dashboard from '@/components/Dashboard'
import { useParams, useRouter } from 'next/navigation'
import { useDashboardStore } from '@/stores/DashboardStore'
import DeleteDashboardButton from '@/components/DeleteDashboardButton'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { dashboardId } = useParams()
  const currentDashboard = useDashboardStore(state => state.currentDashboard)
  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!dashboardId) return
    let mounted = true
    const ac = new AbortController()

    async function fetchDashboard() {
      try {
        const res = await fetch(`/api/dashboards/${dashboardId}`, { signal: ac.signal })
        if (!mounted) return

        if (res.status === 404) {
          setCurrentDashboard(null)
          router.replace('/')
          return
        }

        if (!res.ok) {
          throw new Error(`Failed to fetch dashboard: ${res.status}`)
        }

        const data = await res.json()
        setCurrentDashboard(data)
      } catch (err: any) {
        if (err.name === 'AbortError') return
        console.warn('Could not load dashboard:', err?.message || err)
      }
    }

    fetchDashboard()
    return () => {
      mounted = false
      ac.abort()
    }
  }, [dashboardId, setCurrentDashboard, router])

  if (isLoading || !currentDashboard) return <div>Loading dashboard...</div>

  return (
    <div
      className={`max-w-[1536px] px-4 pb-2 sm:px-8 lg:flex lg:flex-col lg:justify-start 2xl:mx-auto 2xl:px-0`}
    >
      <SearchBar />
      <Dashboard />
      <DeleteDashboardButton />
    </div>
  )
}
