const User = require('../models/user.model')

module.exports.getAllUsers = async (_req, res) => {
  const users = await User.find({ isActive: true })

  return res.json(users)
}

module.exports.updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body }
  )

  if (!user) return res.status(400).send({ message: 'User not found' })

  await user.save()

  return res.status(200).send({ message: 'User updated' })
}

module.exports.deleteUser = async (req, res) => {
  const userExist = await User.findOne({
    _id: req.params.id,
    isActive: true
  })

  if (!userExist) return res.status(400).send({ message: 'User not found' })

  userExist.isActive = false

  await userExist.save()

  return res.status(200).send({ message: 'User deleted' })
}
