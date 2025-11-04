import { Dashboard } from '@/models/Dashboard'
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { IColumn, ITask } from '@/types/DashboardContext'

export async function PATCH(
  req: Request,
  context: { params: Promise<{ dashboardId: string; taskId: string }> }
) {
  const { dashboardId, taskId } = await context.params
  await connectToDatabase()

  const { columnTitle, title, description } = await req.json()
  const dashboard = await Dashboard.findById(dashboardId)
  if (!dashboard) return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 })

  const fromColumn = dashboard.columns.find((col: IColumn) =>
    col.tasks.some(t => t._id.toString() === taskId)
  )
  if (!fromColumn) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

  const task = fromColumn.tasks.find((t: ITask) => t._id.toString() === taskId)!
  if (title !== undefined) task.title = title
  if (description !== undefined) task.description = description

  if (columnTitle && columnTitle !== fromColumn.title) {
    fromColumn.tasks = fromColumn.tasks.filter((t: ITask) => t._id.toString() !== taskId)
    const toColumn = dashboard.columns.find((c: IColumn) => c.title === columnTitle)
    if (!toColumn) return NextResponse.json({ error: 'Target column not found' }, { status: 404 })
    task.type = columnTitle
    toColumn.tasks.push(task)
  }

  await dashboard.save()
  return NextResponse.json(dashboard)
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ dashboardId: string; taskId: string }> }
) {
  const { dashboardId, taskId } = await context.params
  await connectToDatabase()

  console.log('DELETE /api/dashboards/:dashboardId/tasks/:taskId', { dashboardId, taskId })

  const dashboard = await Dashboard.findById(dashboardId)
  if (!dashboard) return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 })

  let removed = false
  for (const column of dashboard.columns) {
    const before = column.tasks.length
    column.tasks = column.tasks.filter((t: ITask) => t._id.toString() !== taskId)
    if (column.tasks.length !== before) removed = true
  }

  if (!removed) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

  await dashboard.save()
  return NextResponse.json({ success: true })
}
