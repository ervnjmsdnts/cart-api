const { Router } = require('express')
const {
  getAllDeviceReceipt,
  getCart,
  checkout,
  completeCheckout
} = require('../controllers/cart.controller')

const router = Router()

router.get('/receipts/:deviceId', getAllDeviceReceipt)
router.get('/:code', getCart)
router.post('/checkout', checkout)
router.patch('/complete-checkout/:id', completeCheckout)

module.exports = router
