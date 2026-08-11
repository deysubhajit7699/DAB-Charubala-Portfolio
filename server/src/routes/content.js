import { Router } from 'express'
import Project from '../models/Project.js'
import TeamMember from '../models/TeamMember.js'
import Service from '../models/Service.js'
import Package from '../models/Package.js'
import SiteConfig from '../models/SiteConfig.js'
import { asyncHandler } from '../middleware/index.js'

const router = Router()

/**
 * GET /api/content
 *
 * The whole site's content in ONE request. The frontend calls this once on
 * boot and renders every page from the result — so navigating during a client
 * meeting never waits on the network, and a slow connection costs one
 * round trip instead of one per page.
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const [site, projects, team, services, packages] = await Promise.all([
      SiteConfig.getSingleton(),
      Project.find({ published: true }).sort({ featured: -1, order: 1, createdAt: -1 }).lean(),
      TeamMember.find({ published: true }).sort({ order: 1 }).lean(),
      Service.find({ published: true }).sort({ order: 1 }).lean(),
      Package.find({ published: true }).sort({ order: 1 }).lean(),
    ])

    // Derive categories from what's actually published, falling back to the
    // configured list — so a category never shows up with zero projects behind it.
    const used = [...new Set(projects.map((p) => p.category))]
    const categories = (site?.categories?.length ? site.categories : used).filter((c) =>
      used.includes(c)
    )

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600')
    res.json({ site, categories, projects, team, services, packages })
  })
)

export default router
