'use client'

import Column from '@/components/Column'
import { useDashboardStore } from '@/stores/DashboardStore'

export default function Dashboard() {
  const columns = useDashboardStore(state => state.currentDashboard?.columns) || []

  return (
    <div
      className={`mb-8 flex w-full flex-col items-start justify-start gap-x-10 gap-y-8 sm:flex-row lg:w-[960px] lg:justify-between`}
    >
      {columns.map(c => (
        <Column columnTitle={c.title} tasks={c.tasks} key={c.title} />
      ))}
    </div>
  )
}
