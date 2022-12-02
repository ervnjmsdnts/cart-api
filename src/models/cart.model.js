const { model, Schema } = require('mongoose')

const cartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, default: 1 }
      }
    ],
    generatedCode: { type: String, required: true },
    deviceId: { type: String, required: true },
    paymentAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isComplete: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = model('Cart', cartSchema)
