import { Router } from 'express'
import mongoose from 'mongoose'

import Project from '../models/Project.js'
import TeamMember from '../models/TeamMember.js'
import Service from '../models/Service.js'
import Package from '../models/Package.js'
import SiteConfig from '../models/SiteConfig.js'

import { crudRouter } from './crud.js'
import contentRouter from './content.js'
import leadsRouter from './leads.js'
import { asyncHandler, requireAdmin } from '../middleware/index.js'

const router = Router()

router.get('/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
  res.json({
    ok: mongoose.connection.readyState === 1,
    db: states[mongoose.connection.readyState] ?? 'unknown',
    uptime: Math.round(process.uptime()),
  })
})

router.use('/content', contentRouter)
router.use('/leads', leadsRouter)

router.use('/projects', crudRouter(Project, { sort: { featured: -1, order: 1, createdAt: -1 } }))
router.use('/team', crudRouter(TeamMember))
router.use('/services', crudRouter(Service))
router.use('/packages', crudRouter(Package, { lookupField: 'name' }))

// Site config is a singleton, so it gets its own two routes rather than CRUD.
router.get(
  '/site',
  asyncHandler(async (req, res) => res.json(await SiteConfig.getSingleton()))
)

router.put(
  '/site',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const site = await SiteConfig.findOneAndUpdate({ key: 'site' }, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    }).lean()
    res.json(site)
  })
)

export default router
