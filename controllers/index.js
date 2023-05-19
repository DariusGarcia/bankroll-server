const router = require('express').Router()
const userRoutes = require('./userRoutes')
const sessionRoutes = require('./sessionRoutes')

const requireAuth = require('../middleware/requireAuth')

router.get('/', (req, res) => {
  res.send('<h1>BankRoll Express Server: Running</h1>')
})
router.use('/api/user', userRoutes)
router.use('/api/sessions', requireAuth, sessionRoutes)

module.exports = router
