export enum TaskType {
  TODO = 'ToDo',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export interface ITask {
  _id: string
  type: TaskType
  title: string
  description: string
}

export interface IColumn {
  title: TaskType
  tasks: ITask[]
}

export interface IDashboard {
  _id: string
  name: string
  columns: IColumn[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IDashboardContext {
  currentDashboard: IDashboard | null
  setCurrentDashboard: (value: IDashboard | null) => void
}
