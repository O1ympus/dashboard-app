import ColumnHeading from '@/components/ColumnHeading'
import Task from '@/components/Task'
import { ITask, TaskType } from '@/types/DashboardContext'
import TaskPlaceholder from '@/components/TaskPlaceholder'
import { dashboardTaskCountColors } from '@/data/dashboardTaskCountColors'
import { useDashboardStore } from '@/stores/DashboardStore'

interface Props {
  columnTitle: TaskType
  tasks: ITask[]
}

export default function Column({ columnTitle, tasks }: Props) {
  const currentDashboard = useDashboardStore(state => state.currentDashboard)
  const setCurrentDashboard = useDashboardStore(state => state.setCurrentDashboard)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('text/taskId')
    const fromColumn = e.dataTransfer.getData('text/fromColumn')
    if (!taskId || !currentDashboard) return
    if (fromColumn === String(columnTitle)) return

    try {
      const res = await fetch(`/api/dashboards/${currentDashboard._id}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columnTitle }),
      })

      if (!res.ok) {
        let data: any = null
        try {
          data = await res.json()
        } catch {}
        console.error('Move failed:', data)
        alert(`Move failed: ${data?.error || res.status}`)
        return
      }

      const updated = await res.json()
      setCurrentDashboard(updated)
    } catch (err) {
      console.error('Unexpected move error:', err)
      alert('Unexpected error moving task. Check console.')
    }
  }

  return (
    <div
      className={`flex w-full flex-col items-center lg:w-[320px]`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ColumnHeading
        title={columnTitle}
        taskCount={tasks.length}
        colors={dashboardTaskCountColors[columnTitle] || ['#000', '#eee']}
      />

      <div className={`flex w-full flex-col gap-4`}>
        {tasks.map(t => (
          <Task task={t} columnTitle={columnTitle} key={t._id} />
        ))}
        <TaskPlaceholder columnType={columnTitle} />
      </div>
    </div>
  )
}
