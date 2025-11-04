import { NextResponse } from 'next/server'
import { Dashboard } from '@/models/Dashboard'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(req: Request) {
  try {
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
  } catch (err) {
    console.error('GET /api/dashboards error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/dashboards reached')
    await connectToDatabase()
    const data = await request.json()
    console.log('Received data:', data)

    if (!data?.name || typeof data.name !== 'string' || !data.name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const dashboard = await Dashboard.create(data)
    console.log('Created:', dashboard)

    return NextResponse.json(dashboard.toJSON())
  } catch (error) {
    console.error('POST /api/dashboards error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
