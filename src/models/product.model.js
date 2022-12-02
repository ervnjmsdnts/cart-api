const { model, Schema } = require('mongoose')

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = model('Product', productSchema)
