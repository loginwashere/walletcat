const format = require('date-fns/format')
const transactionSeederItems = require('./20170114214507-transaction').items
const accountSeederItems = require('./20170114214459-account').items

const DEFAULT_DATE = '1995-02-10 18:45:43.948+00'

const transactionItems = [
  {
    id: '00000000-5a23-4ef3-0008-000000000000',
    transactionId: transactionSeederItems[0].id,
    type: 'credit',
    accountId: accountSeederItems[0].id,
    amount: '100.00000000',
    rate: '1.00000000',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  },
  {
    id: '00000000-5a23-4ef3-0008-000000000001',
    transactionId: transactionSeederItems[0].id,
    type: 'debit',
    accountId: accountSeederItems[1].id,
    amount: '100.00000000',
    rate: '1.00000000',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  },
  {
    id: '00000000-5a23-4ef3-0008-000000000002',
    transactionId: transactionSeederItems[1].id,
    type: 'credit',
    accountId: accountSeederItems[0].id,
    amount: '1000.00000000',
    rate: '1.00000000',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  },
  {
    id: '00000000-5a23-4ef3-0008-000000000003',
    transactionId: transactionSeederItems[1].id,
    type: 'debit',
    accountId: accountSeederItems[1].id,
    amount: '1000.00000000',
    rate: '1.00000000',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('transaction_items', transactionItems, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('transaction_items', null, {})
  },

  items: transactionItems,

  itemsById: transactionItems
    .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {}),
}
