'use client'

import { useDashboardStore } from '@/stores/DashboardStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteDashboardButton() {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const currentDashboard = useDashboardStore(state => state.currentDashboard)
  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)

  const handleDelete = async () => {
    if (!currentDashboard?._id) {
      alert('No dashboard selected')
      return
    }

    const confirmed = confirm(`Delete dashboard "${currentDashboard.name}"?`)
    if (!confirmed) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/dashboards/${currentDashboard._id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete dashboard')
      }

      setCurrentDashboard(null)
      await router.replace('/')
    } catch (err) {
      console.error(err)
      alert('Error deleting dashboard')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`w-full cursor-pointer rounded-2xl bg-red-400 px-6 py-3 text-lg font-bold text-white hover:bg-red-600 disabled:opacity-70 sm:block sm:w-[520px]`}
    >
      {isDeleting ? 'Deleting...' : 'Delete Dashboard'}
    </button>
  )
}
