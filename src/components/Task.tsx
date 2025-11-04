import TaskFooter from '@/components/TaskFooter'
import { ITask } from '@/types/DashboardContext'

interface Props {
  task: ITask
  columnTitle: string
}

export default function Task({ task, columnTitle }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/taskId', task._id)
    e.dataTransfer.setData('text/fromColumn', String(columnTitle))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className={`mb-3 h-fit min-h-30 w-full rounded-sm bg-white p-3 shadow-sm dark:bg-[#383838] dark:text-white`}
      draggable
      onDragStart={handleDragStart}
    >
      <div className={`mb-4`}>
        <h3>
          <span className={`font-medium`}>Title: </span>
          <span>{task.title}</span>
        </h3>
        <p>
          <span className={`font-medium`}>Description: </span>
          <span>{task.description}</span>
        </p>
      </div>

      <TaskFooter taskId={task._id} columnTitle={columnTitle} />
    </div>
  )
}
