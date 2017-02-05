if (process.env.NODE_ENV === 'production') {
  require('newrelic')
}

const fs = require('fs')
const config = require('./config')
const server = require('./server')

const app = server()

app.set('port', config.PORT)
const httpServer = app.listen(config.NODE_APP_SOCKET || app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
  if (config.NODE_APP_SOCKET) {
    fs.openSync('/tmp/app-initialized', 'w')
  }
})

module.exports = {
  httpServer,
  app
}
