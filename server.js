const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const format = require('date-fns/format');

const hashSecret = 'abcdefg';
const jwtSecret = 'shhhhhhared-secret';

function hashPassword(password) {
  return crypto
    .createHmac('sha256', hashSecret)
    .update(password)
    .digest('hex')
}

function md5(string) {
  return crypto
    .createHash('md5')
    .update(string)
    .digest("hex");
}

let users = [];
users.push({
  id: 1,
  email: 'admin@mail.com',
  username: 'admin',
  avatar: `https://www.gravatar.com/avatar/${md5('admin@mail.com')}?s=50`,
  password: hashPassword('qwerty'),
  created: format(new Date()),
  updated: format(new Date())
});

let currencies = [];
currencies.push({
  id: 1,
  name: 'USD',
  description: 'United States Dollar',
  created: format(new Date()),
  updated: format(new Date())
});
currencies.push({
  id: 2,
  name: 'UAH',
  description: 'Ukrainian Hryvna',
  created: format(new Date()),
  updated: format(new Date())
});

let tokens = [];

let userCurrencies = [];
userCurrencies.push({
  id: 1,
  userId: users[0].id,
  currencyId: currencies[0].id,
  created: format(new Date()),
  updated: format(new Date())
});

let categories = [];
categories.push({
  id: 1,
  userId: users[0].id,
  name: 'Fast food',
  description: 'Some fast food',
  created: format(new Date()),
  updated: format(new Date())
})

let accounts = [];
accounts.push({
  id: 1,
  userId: users[0].id,
  currencyId: userCurrencies[0].id,
  name: 'Wallet',
  description: 'My Wallet',
  amount: 0,
  created: format(new Date()),
  updated: format(new Date())
});
accounts.push({
  id: 2,
  userId: users[0].id,
  currencyId: userCurrencies[0].id,
  name: 'Stash',
  description: 'My Stash',
  amount: 0,
  created: format(new Date()),
  updated: format(new Date())
});

let transactions = [];
transactions.push({
  id: 1,
  userId: users[0].id,
  fromAccountId: accounts[0].id,
  toAccountId: accounts[1].id,
  categoryId: categories[0].id,
  fromAmount: 100,
  toAmount: 100,
  description: 'description',
  date: format(new Date()),
  created: format(new Date()),
  updated: format(new Date())
});

const app = express();

const jwtMiddleware = expressJwt({
    secret: jwtSecret
  })
  .unless({
    path: [
      { url: '/' },
      { url: '/accounts' },
      { url: '/transactions' },
      { url: '/categories' },
      { url: '/recurring-payments' },
      { url: '/currencies' },
      { url: '/reports' },
      { url: '/about' },
      { url: '/contact-us' },
      { url: '/profile' },
      { url: '/logout' },
      { url: '/login' },
      { url: '/register' },
      { url: '/static' },
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
app.use(jwtMiddleware);
app.use(errorHandler);
// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.set('port', (process.env.PORT || 3001));

app.get('/api/currencies', (req, res) => {
  res.json({
    currencies
  });
});

app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'Validation error'
    })
  }
  const user = {
    id: users.length + 1,
    email: req.body.email,
    avatar: `https://www.gravatar.com/avatar/${md5(req.body.email)}?s=50`,
    username: req.body.username,
    password: hashPassword(req.body.password),
    created: format(new Date()),
    updated: format(new Date())
  };
  users.push(user);
  res.json({
    user
  })
});

function generateToken(userId) {
  return jwt.sign(
    { sub: userId },
    jwtSecret,
    { expiresIn: '1h' }
  );
}

function getValidToken(tokens, userId) {
  const token = tokens[userId];
  if (token) {
    try {
      jwt.verify(token, jwtSecret);
      return token;
    } catch (err) {
      if (err && err.name === 'TokenExpiredError') {
        return generateToken(userId);
      }
      throw(err);
    }
  }
  return generateToken(userId);
}

app.post('/api/auth', (req, res) => {
  const user = users.filter(user => user.email === req.body.email)[0];
  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }
  if (!req.body.password || hashPassword(req.body.password) !== user.password) {
    return res.status(403).json({
      error: 'Credentials do not match'
    });
  }
  const token = getValidToken(tokens, user.id);
  if (tokens[user.id] !== token) {
    tokens[user.id] = token;
  }
  return res.json({
    token,
    user
  });
});

app.delete('/api/auth', (req, res) => {
  tokens[req.user.sub] = null;
  res.json({
    result: true
  });
});

app.get('/api/user-currencies', (req, res) => {
  res.json({
    userCurrencies: userCurrencies
      .filter((userCurrency) => userCurrency.userId === req.user.sub)
  });
});

app.post('/api/user-currencies', (req, res) => {
  const newUserCurrecny = {
    id: userCurrencies.length + 1,
    userId: req.user.sub,
    currencyId: req.body.currencyId,
    created: format(new Date()),
    updated: format(new Date())
  };
  userCurrencies.push(newUserCurrecny)
  res.json(newUserCurrecny);
});

app.delete('/api/user-currencies/:id', (req, res) => {
  const userCurrency = userCurrencies
    .filter((userCurrency) => userCurrency.userId === req.user.sub)
    .filter((userCurrency) => userCurrency.id === req.params.id)
    [0];
  if (userCurrency) {
    const index = userCurrencies.indexOf(userCurrency);
    userCurrencies.splice(index, 1);
  }
  res
    .status(204)
    .json();
});

app.get('/api/categories', (req, res) => {
  res.json({
    categories: categories
      .filter(category => category.userId === req.user.sub)
  });
});

app.post('/api/categories', (req, res) => {
  const category = {
    id: categories.length + 1,
    userId: req.user.sub,
    name: req.body.name,
    description: req.body.description,
    created: format(new Date()),
    updated: format(new Date())
  };
  categories.push(category)
  res.json(category);
});

app.delete('/api/categories/:id', (req, res) => {
  const category = categories
    .filter((category) => category.userId === req.user.sub)
    .filter((category) => category.id === req.params.id)
    [0];
  if (category) {
    const index = categories.indexOf(category);
    categories.splice(index, 1);
  }
  res
    .status(204)
    .json();
});

app.get('/api/accounts', (req, res) => {
  res.json({
    accounts: accounts
      .filter(account => account.userId === req.user.sub)
  });
});

app.post('/api/accounts', (req, res) => {
  const account = {
    id: accounts.length + 1,
    userId: req.user.sub,
    name: req.body.name,
    description: req.body.description,
    currencyId: req.body.currencyId,
    amount: req.body.amount,
    created: format(new Date()),
    updated: format(new Date())
  };
  accounts.push(account)
  res.json(account);
});

app.delete('/api/accounts/:id', (req, res) => {
  const account = accounts
    .filter((account) => account.userId === req.user.sub)
    .filter((account) => account.id === req.params.id)
    [0];
  if (account) {
    const index = accounts.indexOf(account);
    accounts.splice(index, 1);
  }
  res
    .status(204)
    .json();
});

app.get('/api/transactions', (req, res) => {
  res.json({
    transactions: transactions
      .filter(transaction => transaction.userId === req.user.sub)
  });
});

app.post('/api/transactions', (req, res) => {
  const account = {
    id: accounts.length + 1,
    userId: req.user.sub,
    fromAccountId: req.body.fromAccountId,
    toAccountId: req.body.toAccountId,
    rate: req.body.rate,
    name: req.body.name,
    description: req.body.description,
    fromAmount: req.body.fromAmount,
    toAmount: req.body.toAmount,
    categoryId: req.body.categoryId,
    date: req.body.date,
    created: format(new Date()),
    updated: format(new Date())
  };
  accounts.push(account)
  res.json(account);
});

app.delete('/api/transactions/:id', (req, res) => {
  const account = accounts
    .filter((account) => account.userId === req.user.sub)
    .filter((account) => account.id === req.params.id)
    [0];
  if (account) {
    const index = accounts.indexOf(account);
    accounts.splice(index, 1);
  }
  res
    .status(204)
    .json();
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});