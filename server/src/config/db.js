import mongoose from 'mongoose'

export async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set — copy server/.env.example to server/.env')

  mongoose.set('strictQuery', true)

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  })

  console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`)
  return conn
}
