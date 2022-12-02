const { Router } = require('express')
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller')

const router = Router()

router.get('/', getAllProducts)
router.post('/', addProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
