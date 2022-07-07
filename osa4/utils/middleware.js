const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}

/*
Virheenkäsittelyyn asennettu kirjasto npm install express-async-errors
app.js tiedostossa heti expressin alla: require('express-async-errors')
lisäksi app.use(middleware.errorHandler)
Virheet ohjautuvat nyt middlewareen
Muuten Async/await kanssa pitäisi käyttää Try-catch ja ohjata nextilla middlewareen

Tokenextractor middleware rekisteröidään ennen routeja tiedostossa app.js, joten routet pääsevät tokeniin käsiksi suoraan viittaamalla request.token
*/