import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import Lead from '../models/Lead.js'
import { asyncHandler, requireAdmin } from '../middleware/index.js'

const router = Router()

// A public write endpoint needs a throttle or it becomes a spam sink.
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many enquiries from this address. Please try again shortly.' },
})

/** POST /api/leads — public. Anyone can submit an enquiry. */
router.post(
  '/',
  submitLimiter,
  asyncHandler(async (req, res) => {
    const { name, business, phone, email, message, source, projectSlug, website } = req.body

    // Honeypot: real users never fill a field they can't see.
    if (website) return res.status(201).json({ ok: true })

    const lead = await Lead.create({
      name,
      business,
      phone,
      email,
      message,
      source: source || 'contact',
      projectSlug: projectSlug || '',
    })

    res.status(201).json({ ok: true, id: lead._id })
  })
)

/** GET /api/leads — admin only. Your enquiry inbox. */
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const filter = {}
    if (req.query.status) filter.status = req.query.status

    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(req.query.limit) || 100, 500))
      .lean()

    res.json(leads)
  })
)

/** PUT /api/leads/:id — admin only. Move a lead through the pipeline. */
router.put(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
    if (!lead) return res.status(404).json({ error: 'Lead not found' })
    res.json(lead)
  })
)

export default router
