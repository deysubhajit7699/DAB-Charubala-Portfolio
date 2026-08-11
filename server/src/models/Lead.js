import mongoose from 'mongoose'

/**
 * An enquiry captured from the site. WhatsApp is still the primary CTA —
 * this exists so enquiries that arrive outside WhatsApp aren't lost, and so
 * you have a record of who asked for what.
 */
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    business: { type: String, trim: true, maxlength: 160, default: '' },
    phone: { type: String, trim: true, maxlength: 40, default: '' },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 3000 },

    // Where on the site the enquiry came from — e.g. 'contact', 'case-study'
    source: { type: String, default: 'contact', trim: true },
    projectSlug: { type: String, default: '', trim: true },

    status: {
      type: String,
      enum: ['new', 'contacted', 'won', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
)

leadSchema.index({ createdAt: -1 })

export default mongoose.model('Lead', leadSchema)
