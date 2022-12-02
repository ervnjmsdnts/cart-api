const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoutes = require('./src/routes/auth.routes')
const productRoutes = require('./src/routes/product.routes')
const userRoutes = require('./src/routes/user.routes')
const cartRoutes = require('./src/routes/cart.routes')

const main = async () => {
  const app = express()

  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  )
  app.use(express.json({}))
  app.use(express.urlencoded({ extended: true }))

  app.use('/api/auth', authRoutes)
  app.use('/api/product', productRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/cart', cartRoutes)

  await mongoose.connect(
    'mongodb+srv://cart:cart890@cartify.h7zbgsy.mongodb.net/?retryWrites=true&w=majority'
  )
  console.log('MongoDB Connected')

  const PORT = process.env.PORT || 8080

  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

main()
