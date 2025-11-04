import mongoose from 'mongoose'

let cached = (global as any).mongoose
if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
	if (cached.conn) return cached.conn

	const uri = process.env.MONGODB_URI as string
	if (!uri) {
		throw new Error('Please define the MONGODB_URI environment variable')
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(uri, {
			dbName: 'dashboard_app',
		}).then((mongoose) => mongoose)
	}
	
	cached.conn = await cached.promise
	return cached.conn
}
