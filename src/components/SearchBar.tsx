'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDashboardStore } from '@/stores/DashboardStore'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    setIsLoading(true)

    try {
      const res = await fetch(`/api/dashboards?query=${encodeURIComponent(query)}`)

      if (!res.ok) throw new Error('Failed to fetch dashboards')

      const data = await res.json()

      if (Array.isArray(data) && data.length > 0) {
        const found = data[0]
        setCurrentDashboard(found)
        await router.replace(`/dashboards/${found._id}`)
      } else {
        setCurrentDashboard(null)
      }
    } catch (err) {
      console.error(err)
      setCurrentDashboard(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-10 flex h-12 w-full items-center justify-between rounded-sm bg-white px-4 py-3 lg:w-[520px] dark:bg-[#383838]`}
    >
      <Image src="/images/search-icon.svg" alt="Search Icon" width={24} height={24} />

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        className={`ml-2 h-full w-full border-none outline-none dark:text-[#9FA8B7]`}
      />

      <button type="submit" className={`cursor-pointer`} disabled={isLoading}>
        <Image src="/images/enter-icon.svg" alt="Search Icon" width={24} height={24} />
      </button>
    </form>
  )
}
