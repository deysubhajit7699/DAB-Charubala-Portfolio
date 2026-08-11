import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    client: { type: String, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    year: { type: String, trim: true },
    hook: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true },
    gallery: { type: [String], default: [] },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    techStack: { type: [String], default: [] },
    outcome: { type: String, default: '' },
    fitNote: { type: String, default: '' },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
)

// Portfolio order: featured first, then explicit order, then newest
projectSchema.index({ featured: -1, order: 1, createdAt: -1 })

export default mongoose.model('Project', projectSchema)
