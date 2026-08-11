import 'dotenv/config'
import mongoose from 'mongoose'

import { connectDB } from '../config/db.js'
import Project from '../models/Project.js'
import TeamMember from '../models/TeamMember.js'
import Service from '../models/Service.js'
import Package from '../models/Package.js'
import SiteConfig from '../models/SiteConfig.js'

// Seeded straight from the client's fallback data files, so there is exactly
// one source of truth for the initial content.
import { projects, categories } from '../../../client/src/data/projects.js'
import { team } from '../../../client/src/data/team.js'
import { services, packages } from '../../../client/src/data/services.js'
import { site } from '../../../client/src/data/site.js'

const FRESH = process.argv.includes('--fresh')

async function seed() {
  await connectDB(process.env.MONGODB_URI)

  if (FRESH) {
    console.log('--fresh: clearing existing content (leads are left untouched)…')
    await Promise.all([
      Project.deleteMany({}),
      TeamMember.deleteMany({}),
      Service.deleteMany({}),
      Package.deleteMany({}),
      SiteConfig.deleteMany({}),
    ])
  }

  // upsert everywhere, so re-running is safe and won't duplicate content
  const upsert = (Model, key, docs) =>
    Promise.all(
      docs.map((doc, order) =>
        Model.findOneAndUpdate(
          { [key]: doc[key] },
          { ...doc, order },
          { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
        )
      )
    )

  const savedProjects = await upsert(Project, 'slug', projects)

  const savedTeam = await upsert(
    TeamMember,
    'slug',
    // the data file calls it `id`; the model calls it `slug`
    team.map(({ id, ...rest }) => ({ slug: id, ...rest }))
  )

  const savedServices = await upsert(Service, 'slug', services)
  const savedPackages = await upsert(Package, 'name', packages)

  await SiteConfig.findOneAndUpdate(
    { key: 'site' },
    {
      key: 'site',
      name: site.name,
      tagline: site.tagline,
      url: site.url,
      whatsappNumber: site.whatsappNumber,
      email: site.email,
      serviceArea: site.serviceArea,
      social: site.social,
      categories,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )

  console.log(
    `Seeded: ${savedProjects.length} projects, ${savedTeam.length} team members, ` +
      `${savedServices.length} services, ${savedPackages.length} packages, 1 site config.`
  )

  await mongoose.connection.close()
}

seed().catch(async (err) => {
  console.error('Seed failed:', err.message)
  await mongoose.connection.close().catch(() => {})
  process.exit(1)
})
