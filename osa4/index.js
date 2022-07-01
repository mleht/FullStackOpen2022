const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// eslint-disable-next-line no-undef
const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
  logger.info(`Mpngodb URI ${config.MONGODB_URI}`)
})