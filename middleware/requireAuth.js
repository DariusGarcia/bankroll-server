const jwt = require('jsonwebtoken')
const { User } = require('../models')

const requireAuth = async (req, res, next) => {
  // middleware to check if user is logged in
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token!' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findByPk(decodedToken.id) // Find user by primary key

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = requireAuth
