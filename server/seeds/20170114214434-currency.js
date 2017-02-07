const format = require('date-fns/format')
const leftpad = require('../utils/leftpad')

/**
 * openexchangerates currencies
 *
 * Plese note that experimental flag was used, beware that actual behavior may change
 * TODO Check in some time to verify currencies in response
 *
 * https://openexchangerates.org/api/currencies.json?show_experimental=true
 *
 * @see https://docs.openexchangerates.org/v0.7/docs/experimental-currencies
 */
const openexchangeratesCurrencies = require('./files/currencies/openexchangerates_with_experimental')

const currencies = Object.keys(openexchangeratesCurrencies).map((name, index) => ({
  id: `00000000-5a23-4ef3-0001-000000000${leftpad(index, 3, '0')}`,
  name: name,
  description: openexchangeratesCurrencies[name],
  createdAt: format(new Date()),
  updatedAt: format(new Date())
}))

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('currencies', currencies, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('currencies', null, {})
  },

  items: currencies
}
