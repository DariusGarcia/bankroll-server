const userRouter = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')

// fetch all users
userRouter.get('/allUsers', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Specify the column you want to exclude
      include: 'meals',
    })
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

// CREATE new user
userRouter.post('/signup', async (req, res) => {
  const password = req.body.password
  const username = req.body.username
  try {
    // check if the user with the given email already exists
    const existingUser = await User.findOne({ where: { username } })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const newUser = await User.create({
      username: username,
      password: password,
    })

    res.status(200).json(newUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

// LOGIN user
userRouter.post('/login', async (req, res) => {
  const password = req.body.password
  const username = req.body.username
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    })
    if (!user) {
      res
        .status(400)
        .json({ message: 'No existing user account found. Please try again.' })
    }
    // check if passwords match
    const isValidPassword = user.comparePassword(password)
    if (!isValidPassword) {
      res.status(400).json({ message: 'Wrong password.' })
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    )
    res.json({
      id: user.id,
      username,
      token: token,
      message: 'You are now logged in!',
      loggedIn: true,
    })
  } catch (err) {
    res.status(500)
  }
})

module.exports = userRouter
