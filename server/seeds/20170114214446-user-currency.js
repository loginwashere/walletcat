const format = require('date-fns/format')
const v4 = require('uuid/v4')
const userSeederItems = require('./20170114212746-user').items
const currencySeederItems = require('./20170114214434-currency').items

const userCurrencies = [
  {
    id: v4(),
    userId: userSeederItems[0].id,
    currencyId: currencySeederItems[0].id,
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userCurrencies', userCurrencies, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userCurrencies', null, {})
  },

  items: userCurrencies
}
