'use client'

import React, { useEffect, useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import FormSelectInput from '@/components/ui/FormSelectInput'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDashboardStore } from '@/stores/DashboardStore'

export default function UpdateTaskForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') || ''

  const currentDashboard = useDashboardStore(state => state.currentDashboard)
  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)
  const editingTask = useDashboardStore(state => state.editingTask)

  const [taskType, setTaskType] = useState(initialType)
  const [title, setTitle] = useState(editingTask?.title || '')
  const [description, setDescription] = useState(editingTask?.description || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const unsub = useDashboardStore.persist.onFinishHydration(() => setIsReady(true))
    setIsReady(useDashboardStore.persist.hasHydrated())
    return unsub
  }, [])

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '')
      setDescription(editingTask.description || '')
      setTaskType(editingTask.type || initialType)
    }
  }, [editingTask])

  if (!isReady) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentDashboard?._id || !editingTask?._id) {
      alert('Missing dashboard or task data')
      return
    }

    setIsLoading(true)

    try {
      console.log('Updating task:', editingTask._id, 'on dashboard:', currentDashboard._id)

      const res = await fetch(`/api/dashboards/${currentDashboard._id}/tasks/${editingTask._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          columnTitle: taskType,
          title,
          description,
        }),
      })

      let data: any = null
      try {
        data = await res.json()
      } catch {}

      if (!res.ok) {
        console.error('Failed to update task:', data)
        alert(`Failed to update task: ${data?.error || res.status}`)
        return
      }

      console.log('Task updated successfully:', data)
      setCurrentDashboard(data)

      await router.replace(`/dashboards/${currentDashboard._id}`)
    } catch (err) {
      console.error('Unexpected error updating task:', err)
      alert('Unexpected error updating task. Check console.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-fit flex-col items-center rounded-2xl bg-[#F6FBF9] px-4 py-6 text-center sm:px-[60px] sm:py-[50px] dark:bg-[#383838]">
      <h1 className="mb-2 text-3xl font-bold text-[#212B27] dark:text-white">Update A Task</h1>
      <p className="mb-5 max-w-[400px] text-lg text-[#212B27] dark:text-white">
        Update your task details below.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[600px] flex-col gap-8">
        <FormSelectInput selected={taskType} handleSelected={setTaskType} />
        <FormInput placeholder="Task title" handleOnChange={setTitle} title={title} />
        <FormTextarea
          placeholder="Task description"
          value={description}
          handleOnChange={setDescription}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto w-fit rounded-2xl bg-[#84C7AE] px-15 py-4 text-lg font-bold text-white dark:bg-[#BB86FC]"
        >
          {isLoading ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  )
}
