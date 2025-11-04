'use client'

import React, { useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import { useDashboardStore } from '@/stores/DashboardStore'
import { useRouter } from 'next/navigation'

export default function DashboardForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('api/dashboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: title }),
      })

      if (!res.ok) {
        throw new Error('Failed to create dashboard')
      }

      const data = await res.json()

      setCurrentDashboard(data)
      setTitle('')

      await router.replace(`/dashboards/${data?._id}`)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`mx-auto flex w-fit flex-col items-center rounded-2xl bg-[#F6FBF9] p-4 text-center sm:px-[60px] sm:py-[50px] dark:bg-[#F6FBF9]/95`}
    >
      <h1 className={`mb-2 text-3xl font-bold text-[#212B27]`}>Create A Dashboard</h1>
      <p className={`mb-5 max-w-[400px] text-lg text-[#212B27]`}>
        Create a dashboard to enjoy all the services without any ads for free!
      </p>
      <form onSubmit={handleSubmit} className={`mx-auto flex w-full max-w-[600px] flex-col gap-8`}>
        <FormInput placeholder="Dashboard title" handleOnChange={setTitle} title={title} />
        <button
          type="submit"
          disabled={isLoading}
          className={`mx-auto w-fit cursor-pointer rounded-2xl bg-[#84C7AE] px-15 py-4 text-sm font-bold text-white sm:text-lg dark:bg-[#84C7AE]/90`}
        >
          Create Dashboard
        </button>
      </form>
    </div>
  )
}
