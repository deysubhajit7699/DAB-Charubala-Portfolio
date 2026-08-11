import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { connectDB } from './config/db.js'
import apiRoutes from './routes/index.js'
import { errorHandler, notFound } from './middleware/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 5000
const isProd = process.env.NODE_ENV === 'production'

app.set('trust proxy', 1) // correct client IPs behind Render/Railway/Fly proxies

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(morgan(isProd ? 'combined' : 'dev'))

// Allow the deployed frontend + local dev. Comma-separated list in CLIENT_ORIGIN.
const allowed = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin requests and curl/Postman send no Origin header.
      if (!origin || allowed.includes(origin)) return cb(null, true)
      cb(new Error(`Origin ${origin} not allowed by CORS`))
    },
  })
)

app.use('/api', apiRoutes)

// In production the server can also serve the built React app, so the whole
// thing runs as a single deployment if you'd rather not split it.
if (isProd && process.env.SERVE_CLIENT === 'true') {
  const clientDist = path.resolve(__dirname, '../../client/dist')
  app.use(express.static(clientDist))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.use(notFound)
app.use(errorHandler)

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}/api`))
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message)
    process.exit(1)
  })
