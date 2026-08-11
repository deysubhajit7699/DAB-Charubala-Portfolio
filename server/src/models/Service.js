import mongoose from 'mongoose'

const processStepSchema = new mongoose.Schema(
  {
    step: { type: String, required: true },
    detail: { type: String, required: true },
  },
  { _id: false }
)

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    icon: { type: String, default: 'spark' },
    title: { type: String, required: true, trim: true },
    summary: { type: String, default: '' },
    forWho: { type: String, default: '' },
    includes: { type: [String], default: [] },
    process: { type: [processStepSchema], default: [] },
    timeline: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.model('Service', serviceSchema)
