const format = require('date-fns/format')
const userSeederItems = require('./20170114212746-user').items
const accountSeederItems = require('./20170114214459-account').items
const categorySeederItems = require('./20170114214453-category').items

const transactions = [
  {
    id: '00000000-5a23-4ef3-0006-000000000000',
    userId: userSeederItems[0].id,
    fromAccountId: accountSeederItems[0].id,
    toAccountId: accountSeederItems[1].id,
    categoryId: categorySeederItems[0].id,
    fromAmount: '100.00000000',
    toAmount: '100.00000000',
    fromRate: '1.00000000',
    toRate: '1.00000000',
    date: format(new Date()),
    description: 'description',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('transactions', transactions, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('transactions', null, {})
  },

  items: transactions
}
