const Cart = require('../models/cart.model')
const { generateId } = require('../helpers/uuid')

// User
module.exports.getAllDeviceReceipt = async (req, res) => {
  const carts = await Cart.find({
    isActive: true,
    isComplete: true,
    deviceId: req.params.deviceId
  })

  return res.json(carts)
}

// Cashier
module.exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ generatedCode: req.params.code })

  return res.json(cart)
}

// User & Cashier
module.exports.checkout = async (req, res) => {
  const generatedCode = generateId().slice(0, 4)
  const cart = new Cart({ ...req.body, generatedCode })

  await cart.save()

  return res.status(200).json(cart)
}

// Cashier
module.exports.completeCheckout = async (req, res) => {
  const cart = await Cart.findOne({ _id: req.params.id })

  if (!cart) return res.status(400).send({ message: 'Cart not found' })

  cart.paymentAmount = req.body.paymentAmount
  cart.isComplete = true

  await cart.save()

  return res.status(200).send({ message: 'Order complete' })
}
