const generate = require('../helpers/generate')
const verify = require('../helpers/verify')
const User = require('../models/user.model')

module.exports.registerController = async (req, res) => {
  let { role, username, password, email, firstName, lastName } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) return res.status(400).send({ message: 'User already exists' })

  password = await generate.hash(password)

  const user = new User({
    username,
    email,
    firstName,
    lastName,
    password,
    ...(role && { role })
  })

  await user.save()

  return res.status(201).json({ message: 'User created' })
}

module.exports.loginController = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) return res.status(400).send({ message: 'User does not exist' })

  const passwordValid = await verify.hash(password, user.password)

  if (!passwordValid)
    return res.status(400).send({ message: 'Credentials are invalid' })

  const token = generate.jwt({
    id: user._id,
    username: user.username,
    role: user.role
  })

  return res.status(200).send({ message: 'User logged in', token, user })
}
