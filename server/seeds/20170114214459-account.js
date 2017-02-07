const format = require('date-fns/format')
const userSeederItems = require('./20170114212746-user').items
const userCurrencySeederItems = require('./20170114214446-user-currency').items
const agentSeederItems = require('./20170114214456-agent').items

const accounts = [
  {
    id: '00000000-5a23-4ef3-0005-000000000000',
    userId: userSeederItems[0].id,
    currencyId: userCurrencySeederItems[0].id,
    agentId: agentSeederItems[0].id,
    name: 'Wallet',
    description: 'My Wallet',
    amount: '0.00000000',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  },
  {
    id: '00000000-5a23-4ef3-0005-000000000001',
    userId: userSeederItems[0].id,
    currencyId: userCurrencySeederItems[0].id,
    agentId: agentSeederItems[0].id,
    name: 'Stash',
    description: 'My Stash',
    amount: '0.00000000',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('accounts', accounts, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('accounts', null, {})
  },

  items: accounts
}
