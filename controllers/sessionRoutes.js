const sessionRouter = require('express').Router()
const { Session, User } = require('../models')
const jwt = require('jsonwebtoken')

// READ all gambling sessions
sessionRouter.get('/', async (req, res) => {
  const token = req.headers.authorization // Assuming the token is provided in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = decodedToken.id
  const user = await User.findByPk(userId) // Retrieve the user instance by their ID
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    const newSession = await Session.findAll({ where: { userId: userId } })
    res.status(200).json(newSession)
  } catch (err) {
    res.status(500).json(err)
  }
})

// READ a specific gambling session by ID
sessionRouter.get('/:sessionId', async (req, res) => {
  const token = req.headers.authorization // Assuming the token is provided in the Authorization header
  const { sessionId } = req.params // Get the session ID from the URL parameters

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = decodedToken.id
  const user = await User.findByPk(userId) // Retrieve the user instance by their ID
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    const session = await Session.findOne({
      where: { id: sessionId, userId: userId },
    })
    if (!session) {
      return res.status(404).json({ message: 'Session not found' })
    }
    res.status(200).json(session)
  } catch (err) {
    res.status(500).json(err)
  }
})

// CREATE new gambling session
sessionRouter.post('/', async (req, res) => {
  const {
    category,
    additionalBuyIn,
    initialBuyIn,
    location,
    profit,
    date,
    timeSpent,
    sportsBetName,
    typeOfBet,
    sportsBetOdds,
  } = req.body
  const token = req.headers.authorization // Assuming the token is provided in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = decodedToken.id
  const user = await User.findByPk(userId) // Retrieve the user instance by their ID
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    const newSession = await user.createSession({
      category: category,
      additionalBuyIn: additionalBuyIn,
      initialBuyIn: initialBuyIn,
      location: location,
      profit: profit,
      date: date,
      timeSpent: timeSpent,
      sportsBetName: sportsBetName,
      sportsBetOdds: sportsBetOdds,
      typeOfBet: typeOfBet,
    })

    res.status(200).json(newSession)
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE a gambling session
sessionRouter.put('/:id', async (req, res) => {
  const token = req.headers.authorization // Assuming the token is provided in the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const {
    category,
    additionalBuyIn,
    initialBuyIn,
    location,
    profit,
    date,
    timeSpent,
    sportsBetName,
    sportsBetOdds,
    typeOfBet,
  } = req.body

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = decodedToken.id
  const user = await User.findByPk(userId) // Retrieve the user instance by their ID
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const sessionId = req.params.id
  try {
    const updatedSession = await Session.update(
      {
        category: category,
        additionalBuyIn: additionalBuyIn,
        initialBuyIn: initialBuyIn,
        location: location,
        profit: profit,
        date: date,
        timeSpent: timeSpent,
        sportsBetName: sportsBetName,
        sportsBetOdds: sportsBetOdds,
        typeOfBet: typeOfBet,
      },
      {
        where: {
          id: sessionId,
        },
      }
    )

    if (updatedSession[0] === 0) {
      res.status(404).json({ message: 'Gambling session not found' })
    } else {
      res.status(200).json({ message: 'Gambling session updated successfully' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE multiple sessions
sessionRouter.delete('/', async (req, res) => {
  const sessionIds = req.body.sessionIds

  try {
    const deletedSessions = await Session.destroy({
      where: {
        id: sessionIds,
      },
    })

    if (deletedSessions === 0) {
      res.status(404).json({ message: 'Gambling sessions not found' })
    } else {
      res.status(200).json({ message: 'Gambling session deleted successfully' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = sessionRouter
