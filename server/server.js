const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const unless = require('express-unless');
const config = require('./config');

module.exports = () => {
  const app = express();
  const jwtMiddleware = expressJwt({
      secret: config.JWT_SECRET
    })
    .unless({
      path: [
        {
          url: '/api/auth',
          methods: ['POST']
        },
        {
          url: '/api/users',
          methods: ['POST']
        }
      ]
    });

  function errorHandler(err, req, res, next) {
    if (err) {
      console.log(err);
    }
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
        error: 'invalid token...'
      });
    }
  }

  app.use(bodyParser.json());
  app.use('/api/*', jwtMiddleware);
  app.use(errorHandler);
  // Express only serves static assets in production
  if (process.env.NODE_ENV === 'production') {
    const staticMiddleware = express.static('build');
    staticMiddleware.unless = unless;
    app.use(staticMiddleware.unless({ method: 'OPTIONS' }));
  }

  const accountsRouter = require('./routes/accounts');
  const authRouter = require('./routes/auth');
  const currenciesRouter = require('./routes/currencies');
  const userCurrenciesRouter = require('./routes/userCurrencies');
  const categoriesRouter = require('./routes/categories');
  const transactionsRouter = require('./routes/transactions');
  const usersRouter = require('./routes/users');

  app.use('/api/accounts', accountsRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/currencies', currenciesRouter);
  app.use('/api/user-currencies', userCurrenciesRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/transactions', transactionsRouter);
  app.use('/api/users', usersRouter);

  app.get('*', (req, res) => {
    res
      .status(200)
      .sendFile(`${__dirname}/build/index.html`);
  });
  return app;
};
