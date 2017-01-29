const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const unless = require('express-unless')
const debug = require('debug')('app')
const config = require('./config')
const ExtandableError = require('./errors/extendable')
const ServerError = require('./errors/server-error')

module.exports = () => {
  const app = express()

  app.use((req, res, next) => {
    debug("req.header('origin')", req.header('origin'))
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })

  const jwtMiddleware = expressJwt({
    secret: config.JWT_SECRET
  })
  .unless({
    path: [
      {
        url: /.*/,
        methods: ['OPTIONS']
      },
      {
        url: '/api/auth',
        methods: ['POST']
      },
      {
        url: '/api/users',
        methods: ['POST']
      },
      {
        url: '/api/users/email-confirm',
        methods: ['POST']
      },
      {
        url: '/api/users/resend-email-confirm',
        methods: ['POST']
      },
      {
        url: '/api/oauth/callback/facebook',
        methods: ['GET']
      }
    ]
  })

  app.use(bodyParser.json())
  app.use('/api/*', jwtMiddleware)

  // Express only serves static assets in production
  if (process.env.NODE_ENV === 'production') {
    const staticMiddleware = express.static('build')
    staticMiddleware.unless = unless
    app.use(staticMiddleware.unless({ method: 'OPTIONS' }))
  }

  const accountsRouter = require('./routes/accounts')
  const authRouter = require('./routes/auth')
  const currenciesRouter = require('./routes/currencies')
  const userCurrenciesRouter = require('./routes/userCurrencies')
  const categoriesRouter = require('./routes/categories')
  const transactionsRouter = require('./routes/transactions')
  const usersRouter = require('./routes/users')
  const oauthRouter = require('./routes/oauth')

  app.use('/api/accounts', accountsRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/currencies', currenciesRouter)
  app.use('/api/user-currencies', userCurrenciesRouter)
  app.use('/api/categories', categoriesRouter)
  app.use('/api/transactions', transactionsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/oauth', oauthRouter)

  function removeStack(err) {
    const error = Object.assign({}, err)
    delete error.stack
    return error
  }

  app.use((err, req, res, next) => {
    debug(err)
    res.status(err.status || 500)
    const error = (app.get('env') === 'production')
      ? removeStack(err)
      : err
    if (error instanceof ExtandableError) {
      res.json(error)
    } else {
      res.json(new ServerError(error))
    }
    next(req)
  })

  const pathToIndex = path.resolve(`${__dirname}/../build/index.html`)
  app.get('*', (req, res) => {
    console.log(pathToIndex)
    res
      .status(200)
      .sendFile(pathToIndex)
  })
  return app
}
