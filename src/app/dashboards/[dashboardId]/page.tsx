'use client'

import SearchBar from '@/components/SearchBar'
import Dashboard from '@/components/Dashboard'
import { useParams } from 'next/navigation'
import { useDashboardStore } from '@/stores/DashboardStore'
import DeleteDashboardButton from '@/components/DeleteDashboardButton'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { dashboardId } = useParams()
  const currentDashboard = useDashboardStore(state => state.currentDashboard)
  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!currentDashboard || String(currentDashboard._id) !== dashboardId) {
      setIsLoading(true)
      fetch(`/api/dashboards/${dashboardId}`)
        .then(res => {
          if (!res.ok) throw new Error('Dashboard not found')
          return res.json()
        })
        .then(data => setCurrentDashboard(data))
        .catch(err => {
          console.error(err)
          setCurrentDashboard(null)
        })
        .finally(() => setIsLoading(false))
    }
  }, [dashboardId, currentDashboard, setCurrentDashboard])

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
