import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    price: { type: String, default: 'On request' },
    best: { type: String, default: '' },
    features: { type: [String], default: [] },
    highlight: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.model('Package', packageSchema)
