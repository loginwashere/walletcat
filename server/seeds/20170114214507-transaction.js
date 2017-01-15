const format = require('date-fns/format')
const v4 = require('uuid/v4')
const userSeederItems = require('./20170114212746-user').items
const accountSeederItems = require('./20170114214459-account').items
const categorySeederItems = require('./20170114214453-category').items

const transactions = [
  {
    id: v4(),
    userId: userSeederItems[0].id,
    fromAccountId: accountSeederItems[0].id,
    toAccountId: accountSeederItems[1].id,
    categoryId: categorySeederItems[0].id,
    fromAmount: 100,
    toAmount: 100,
    fromRate: 1,
    toRate: 1,
    date: format(new Date()),
    description: 'description',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transactions', transactions, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transactions', null, {})
  },

  items: transactions
}