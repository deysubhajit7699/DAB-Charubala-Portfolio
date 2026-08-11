import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middleware/index.js'

/**
 * Builds a standard REST resource router.
 * Reads are public; writes require the admin key.
 *
 *   GET    /            list
 *   GET    /:key        one, looked up by `lookupField` (slug/name) or _id
 *   POST   /            create
 *   PUT    /:key        update
 *   DELETE /:key        delete
 */
export function crudRouter(Model, { lookupField = 'slug', sort = { order: 1, createdAt: 1 } } = {}) {
  const router = Router()

  const byKey = (key) =>
    /^[a-f\d]{24}$/i.test(key) ? { _id: key } : { [lookupField]: key.toLowerCase() }

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const filter = {}
      // Admins can pass ?published=all to see drafts too
      if (req.query.published !== 'all') filter.published = true
      if (req.query.category) filter.category = req.query.category
      if (req.query.featured === 'true') filter.featured = true

      const docs = await Model.find(filter).sort(sort).lean()
      res.json(docs)
    })
  )

  router.get(
    '/:key',
    asyncHandler(async (req, res) => {
      const doc = await Model.findOne(byKey(req.params.key)).lean()
      if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` })
      res.json(doc)
    })
  )

  router.post(
    '/',
    requireAdmin,
    asyncHandler(async (req, res) => {
      const doc = await Model.create(req.body)
      res.status(201).json(doc)
    })
  )

  router.put(
    '/:key',
    requireAdmin,
    asyncHandler(async (req, res) => {
      const doc = await Model.findOneAndUpdate(byKey(req.params.key), req.body, {
        new: true,
        runValidators: true,
      })
      if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` })
      res.json(doc)
    })
  )

  router.delete(
    '/:key',
    requireAdmin,
    asyncHandler(async (req, res) => {
      const doc = await Model.findOneAndDelete(byKey(req.params.key))
      if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` })
      res.json({ deleted: true, id: doc._id })
    })
  )

  return router
}
