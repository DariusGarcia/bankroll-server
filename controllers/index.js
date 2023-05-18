const router = require('express').Router()
const userRoutes = require('./userRoutes')
const sessionRoutes = require('./sessionRoutes')

const requireAuth = require('../middleware/requireAuth')

router.use('/api/user', userRoutes)
router.use('/api/sessions', requireAuth, sessionRoutes)

module.exports = router
