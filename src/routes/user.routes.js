const { Router } = require('express')
const {
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/user.controller')

const router = Router()

router.get('/', getAllUsers)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
