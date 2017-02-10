const format = require('date-fns/format')
const userSeederItems = require('./20170114212746-user').items
const categorySeederItems = require('./20170114214453-category').items

const DEFAULT_DATE = '1995-02-10 18:45:43.948+00'

const transactions = [
  {
    id: '00000000-5a23-4ef3-0006-000000000000',
    userId: userSeederItems[0].id,
    categoryId: categorySeederItems[0].id,
    date: DEFAULT_DATE,
    description: 'description',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  },
  {
    id: '00000000-5a23-4ef3-0006-000000000001',
    userId: userSeederItems[0].id,
    categoryId: categorySeederItems[0].id,
    date: DEFAULT_DATE,
    description: 'description description',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('transactions', transactions, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('transactions', null, {})
  },

  items: transactions,

  itemsById: transactions
    .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {}),
}
