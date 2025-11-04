import { IDashboard, ITask } from '@/types/DashboardContext'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DashboardState {
  currentDashboard: IDashboard | null
  setCurrentDashboard: (dashboard: IDashboard | null) => void
  clearDashboard: () => void
  editingTask: null | ITask
  setEditingTask: (task: ITask) => void
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    set => ({
      currentDashboard: null,
      setCurrentDashboard: dashboard => set({ currentDashboard: dashboard }),
      clearDashboard: () => set({ currentDashboard: null }),
      editingTask: null,
      setEditingTask: task => set({ editingTask: task }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
)
