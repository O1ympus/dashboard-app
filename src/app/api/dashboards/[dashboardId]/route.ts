import { Dashboard } from '@/models/Dashboard'
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(
  req: Request,
  context: { params: Promise<{ dashboardId: string }> }
) {
  await connectToDatabase()
  const { dashboardId } = await context.params

  const dashboard = await Dashboard.findById(dashboardId)
  if (!dashboard) {
    return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 })
  }
  return NextResponse.json(dashboard)
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ dashboardId: string }> }
) {
  await connectToDatabase()
  const { dashboardId } = await context.params

  if (dashboardId) {
    const deleted = await Dashboard.findByIdAndDelete(dashboardId)
    if (!deleted) {
      return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 })
    }
    return NextResponse.json({ status: 'deleted', id: dashboardId })
  }

  const result = await Dashboard.deleteMany({})
  return NextResponse.json({
    status: 'deleted all',
    deletedCount: result.deletedCount,
  })
}
