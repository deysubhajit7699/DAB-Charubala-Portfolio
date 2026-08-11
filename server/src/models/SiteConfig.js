import mongoose from 'mongoose'

/**
 * Singleton document holding global site settings + the portfolio category list.
 * Always read/written through `SiteConfig.getSingleton()` so there's only ever one.
 */
const siteConfigSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true, immutable: true },
    name: { type: String, default: 'Charubala LLC' },
    tagline: { type: String, default: '' },
    url: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },
    email: { type: String, default: '' },
    serviceArea: { type: String, default: '' },
    social: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
    categories: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false }
)

siteConfigSchema.statics.getSingleton = function () {
  return this.findOneAndUpdate(
    { key: 'site' },
    { $setOnInsert: { key: 'site' } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean()
}

export default mongoose.model('SiteConfig', siteConfigSchema)
