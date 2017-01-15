const format = require('date-fns/format')
const v4 = require('uuid/v4')
const userSeederItems = require('./20170114212746-user').items
const userCurrencySeederItems = require('./20170114214446-user-currency').items

const accounts = [
  {
    id: v4(),
    userId: userSeederItems[0].id,
    currencyId: userCurrencySeederItems[0].id,
    name: 'Wallet',
    description: 'My Wallet',
    amount: 0,
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  },
  {
    id: v4(),
    userId: userSeederItems[0].id,
    currencyId: userCurrencySeederItems[0].id,
    name: 'Stash',
    description: 'My Stash',
    amount: 0,
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('accounts', accounts, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('accounts', null, {})
  },

  items: accounts
}
