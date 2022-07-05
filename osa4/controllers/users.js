const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {      // virheenkäsittely on utils -> middleware NPM kirjasto 'express-async-errors' avulla
  const { username, name, password } = request.body

  const user = await User.findOne({ username })

  if (user) {
    response.status(400).send('Username must be unique')
  } else if (!password || password.length < 3) {
    response.status(400).send('Password is missing or too short')
  } else {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter