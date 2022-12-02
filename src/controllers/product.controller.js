const Product = require('../models/product.model')

module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find({ isActive: true })

  return res.json(products)
}

module.exports.addProduct = async (req, res) => {
  const product = new Product({ ...req.body })

  await product.save()

  return res.status(200).send({ message: 'Product added' })
}

module.exports.updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body }
  )

  if (!product) return res.status(400).send({ message: 'Product not found' })

  await product.save()

  return res.status(200).send({ message: 'Product updated' })
}

module.exports.deleteProduct = async (req, res) => {
  const productExist = await Product.findOne({
    _id: req.params.id,
    isActive: true
  })

  if (!productExist)
    return res.status(400).send({ message: 'Product not found' })

  productExist.isActive = false

  await productExist.save()

  return res.status(200).send({ message: 'Product deleted' })
}
