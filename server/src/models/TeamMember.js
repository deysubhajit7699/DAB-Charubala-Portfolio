import mongoose from 'mongoose'

const teamMemberSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    photo: { type: String, default: null },
    bio: { type: String, default: '' },
    focus: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.model('TeamMember', teamMemberSchema)
