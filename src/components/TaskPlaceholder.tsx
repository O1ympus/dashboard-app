import Line from '@/components/ui/Line'
import Link from 'next/link'
import { TaskType } from '@/types/DashboardContext'

interface Props {
  columnType: TaskType
}

export default function TaskPlaceholder({ columnType }: Props) {
  return (
    <Link
      href={`/create-task?type=${encodeURIComponent(columnType)}`}
      className={`mb-3 h-30 w-full cursor-pointer rounded-sm bg-white p-3 shadow-sm hover:bg-[#F4F5F7] dark:bg-[#383838] dark:text-white`}
    >
      <div className={`relative h-full w-full`}>
        <Line className="h-1 w-10" />
        <Line className="h-10 w-1" />
      </div>
    </Link>
  )
}
