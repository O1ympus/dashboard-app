import { NextResponse } from 'next/server'
import { Dashboard } from '@/models/Dashboard'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(req: Request) {
  await connectToDatabase()
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  let dashboards
  if (query) {
    dashboards = await Dashboard.find({
      name: { $regex: query, $options: 'i' },
    }).lean()
  } else {
    dashboards = await Dashboard.find().lean()
  }

  return NextResponse.json(dashboards)
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/dashboards reached')
    await connectToDatabase()
    const data = await request.json()
    console.log('Received data:', data)

    const dashboard = await Dashboard.create(data)
    console.log('Created:', dashboard)

    return NextResponse.json(dashboard.toJSON())
  } catch (error) {
    console.error('POST /api/dashboards error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
