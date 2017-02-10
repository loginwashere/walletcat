const format = require('date-fns/format')
const userSeederItems = require('./20170114212746-user').items
const userCurrencySeederItems = require('./20170114214446-user-currency').items
const agentSeederItems = require('./20170114214456-agent').items

const DEFAULT_DATE = '1995-02-10 18:45:43.948+00'

const accounts = [
  {
    id: '00000000-5a23-4ef3-0005-000000000000',
    userId: userSeederItems[0].id,
    currencyId: userCurrencySeederItems[0].id,
    agentId: agentSeederItems[0].id,
    name: 'Wallet',
    description: 'My Wallet',
    amount: '0.00000000',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  },
  {
    id: '00000000-5a23-4ef3-0005-000000000001',
    userId: userSeederItems[0].id,
    currencyId: userCurrencySeederItems[0].id,
    agentId: agentSeederItems[0].id,
    name: 'Stash',
    description: 'My Stash',
    amount: '0.00000000',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('accounts', accounts, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('accounts', null, {})
  },

  items: accounts,

  itemsById: accounts
    .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {}),
}
