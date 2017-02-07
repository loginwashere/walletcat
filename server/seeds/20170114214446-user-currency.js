const format = require('date-fns/format')
const userSeederItems = require('./20170114212746-user').items
const currencySeederItems = require('./20170114214434-currency').items

const userCurrencies = [
  {
    id: '00000000-5a23-4ef3-0002-000000000000',
    userId: userSeederItems[0].id,
    currencyId: currencySeederItems[0].id,
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  },
  {
    id: '00000000-5a23-4ef3-0002-000000000001',
    userId: userSeederItems[0].id,
    currencyId: currencySeederItems[1].id,
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('userCurrencies', userCurrencies, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('userCurrencies', null, {})
  },

  items: userCurrencies
}
