'use client'

import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDashboardStore } from '@/stores/DashboardStore'
import Link from 'next/link'

interface Props {
  taskId: string
  columnTitle: string
}

export default function TaskFooter({ taskId, columnTitle }: Props) {
  const currentDashboard = useDashboardStore(state => state.currentDashboard)
  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)
  const setEditingTask = useDashboardStore(state => state.setEditingTask)

  const handleEdit = () => {
    const task = currentDashboard?.columns
      ?.find(col => col.title === columnTitle)
      ?.tasks.find(t => t._id === taskId)
    if (task) setEditingTask({ ...task })
  }

  const handleDelete = async () => {
    if (!currentDashboard?._id) return console.error('No current dashboard selected')

    try {
      console.log('Deleting task:', taskId, 'from dashboard:', currentDashboard._id)
      const res = await fetch(`/api/dashboards/${currentDashboard._id}/tasks/${taskId}`, {
        method: 'DELETE',
      })

      let data: any = null
      try {
        data = await res.json()
      } catch {}

      if (!res.ok) {
        console.error('Delete failed:', data)
        alert(`Delete failed: ${data?.error || res.status}`)
        return
      }

      console.log('Task deleted:', taskId)
      setCurrentDashboard({
        ...currentDashboard,
        columns: currentDashboard.columns.map(col =>
          col.title === columnTitle
            ? { ...col, tasks: col.tasks.filter(t => t._id !== taskId) }
            : col
        ),
      })
    } catch (err) {
      console.error('Unexpected error deleting task:', err)
      alert('Unexpected error deleting task. Check console.')
    }
  }

  return (
    <div className="flex items-center justify-end gap-x-4">
      <Link href={`/update-task?type=${encodeURIComponent(columnTitle)}`}>
        <FaEdit
          onClick={handleEdit}
          className="cursor-pointer text-[#CA8A04]/70 hover:text-[#CA8A04]"
        />
      </Link>
      <FaTrash
        onClick={handleDelete}
        className="cursor-pointer text-[#DB2777]/80 hover:text-[#DB2777]"
      />
    </div>
  )
}
