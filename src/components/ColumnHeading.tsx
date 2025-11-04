import TasksCount from '@/components/TasksCount'

interface Props {
  title: string
  taskCount: number
  colors: string[]
}

export default function ColumnHeading({ title, taskCount, colors }: Props) {
  return (
    <div className={`mb-5 flex w-full items-center justify-between`}>
      <div className={`flex items-center gap-x-3`}>
        <span className={`font-medium`}>{title}</span>
        <TasksCount count={taskCount} divColorHexCode={colors[1]} textColorHexCode={colors[0]} />
      </div>
    </div>
  )
}
