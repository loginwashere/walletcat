const format = require('date-fns/format');
const v4= require('uuid/v4');
const hashPassword = require('../utils').hashPassword;
const generateAvatarUrl = require('../utils').generateAvatarUrl;

const users = require('../collections/users');
const currencies = require('../collections/currencies');
const userCurrencies = require('../collections/userCurrencies');
const categories = require('../collections/categories');
const accounts = require('../collections/accounts');
const transactions = require('../collections/transactions');
const tokens = require('../collections/tokens');

const currenciesSeed = [
  {
    id: v4(),
    name: 'USD',
    description: 'United States Dollar',
    created: format(new Date()),
    updated: format(new Date())
  },
  {
    id: v4(),
    name: 'UAH',
    description: 'Ukrainian Hryvna',
    created: format(new Date()),
    updated: format(new Date())
  }
];

const usersSeed = [
  {
    id: v4(),
    email: 'admin@mail.com',
    username: 'admin',
    avatar: generateAvatarUrl('admin@mail.com'),
    password: hashPassword('qwerty'),
    created: format(new Date()),
    updated: format(new Date())
  }
];

const userCurrenciesSeed = [
  {
    id: v4(),
    // userId: users[0].id,
    // currencyId: currencies[0].id,
    created: format(new Date()),
    updated: format(new Date())
  }
];

const categoriesSeed = [
  {
    id: v4(),
    // userId: users[0].id,
    name: 'Fast food',
    description: 'Some fast food',
    created: format(new Date()),
    updated: format(new Date())
  }
];

const accountsSeed = [
  {
    id: v4(),
    // userId: users[0].id,
    // currencyId: userCurrencies[0].id,
    name: 'Wallet',
    description: 'My Wallet',
    amount: 0,
    created: format(new Date()),
    updated: format(new Date())
  },
  {
    id: v4(),
    // userId: users[0].id,
    // currencyId: userCurrencies[0].id,
    name: 'Stash',
    description: 'My Stash',
    amount: 0,
    created: format(new Date()),
    updated: format(new Date())
  }
];

const transactionsSeed = [
  {
    id: v4(),
    // userId: users[0].id,
    // fromAccountId: accounts[0].id,
    // toAccountId: accounts[1].id,
    // categoryId: categories[0].id,
    fromAmount: 100,
    toAmount: 100,
    description: 'description',
    date: format(new Date()),
    created: format(new Date()),
    updated: format(new Date())
  }
];

const applySeeds = () => {
  const cleamCollections = [
    currencies,
    users,
    userCurrencies,
    categories,
    accounts,
    transactions,
    tokens
  ].map(col => col['clean']());
  return Promise.all(cleamCollections)
    .then(result => Promise.all(currenciesSeed.map(currencies.add)))
    .then(currencies => {
      return Promise.all(usersSeed.map(users.add))
        .then(users => Promise.resolve(Object.assign({},{currencies}, {users})));
    })
    .then(result => {
      const { users, currencies } = result;
      const promises = userCurrenciesSeed
        .map(item => Object.assign({}, item, {
          userId: users[0].id,
          currencyId: currencies[0].id,
        }))
        .map(userCurrencies.add);
      return Promise.all(promises)
        .then(userCurrencies => Promise.resolve(Object.assign({}, result, {
          userCurrencies
        })));
    })
    .then(result => {
      const { users } = result;
      const promises = categoriesSeed
        .map(item => Object.assign({}, item, {
          userId: users[0].id,
        }))
        .map(categories.add);
      return Promise.all(promises)
        .then(categories => Promise.resolve(Object.assign({}, result, {
          categories
        })));
    })
    .then(result => {
      const { users, userCurrencies } = result;
      const promises = accountsSeed
        .map(item => Object.assign({}, item, {
          userId: users[0].id,
          currencyId: userCurrencies[0].id,
        }))
        .map(accounts.add);
      return Promise.all(promises)
        .then(accounts => Promise.resolve(Object.assign({}, result, {
          accounts
        })));
    })
    .then(result => {
      const { users, accounts, categories } = result;
      const promises = transactionsSeed
        .map(item => Object.assign({}, item, {
          userId: users[0].id,
          fromAccountId: accounts[0].id,
          toAccountId: accounts[1].id,
          categoryId: categories[0].id,
        }))
        .map(transactions.add);
      return Promise.all(promises)
        .then(transactions => Promise.resolve(Object.assign({}, result, {
          transactions
        })));
    })
    .then(result => {
      return Promise.resolve(result);
    });
};
module.exports = applySeeds;
