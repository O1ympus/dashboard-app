import { Dashboard } from '@/models/Dashboard'
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { IColumn } from '@/types/DashboardContext'

export async function POST(req: Request, context: { params: Promise<{ dashboardId: string }> }) {
  try {
    await connectToDatabase()

    const { dashboardId } = await context.params
    const { type, title, description } = await req.json()

    const dashboard = await Dashboard.findById(dashboardId)
    if (!dashboard) {
      return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 })
    }

    const column = dashboard.columns.find((c: IColumn) => c.title === type)
    if (!column) {
      return NextResponse.json({ error: 'Column not found' }, { status: 404 })
    }

    column.tasks.push({ title, description, type })
    await dashboard.save()

    return NextResponse.json(dashboard)
  } catch (err) {
    console.error('POST /api/dashboards/[dashboardId]/tasks error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
