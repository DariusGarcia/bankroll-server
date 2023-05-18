const dotenv = require('dotenv')
dotenv.config({ path: './.env.local' })
var cors = require('cors')
const express = require('express')

// const limiter = require('./middleware/rateLimiter')
const routes = require('./controllers')
const sequelize = require('./config/connection')

const app = express()

// let corsOptions = {
//   origin: ['http://localhost:3001', 'http://localhost:3000'],
// }
app.use(cors())

const PORT = Number(process.env.PORT) || 4003

process.on('uncaughtException', (err) => {
  console.error(err)
  console.log('\nNode NOT Exiting...')
})

//  the IP address of the request might be the IP of the load balancer/reverse proxy (making the rate limiter effectively a global one and blocking all requests once the limit is reached) or undefined
// app.set('trust proxy', 1)

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Apply the rate limiting middleware to all api requests
// app.use('/api/', limiter)

// routes
app.use(routes)

// connect to db
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `🚀 ~ Now listening on port ${PORT}\n-------------------------------\n`
    )
  )
})

module.exports = app
