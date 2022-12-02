const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['staff', 'admin'], default: 'staff' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
