const fs = require('fs')
const format = require('date-fns/format')
const v4 = require('uuid/v4')

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

const currencies = Object.keys(openexchangeratesCurrencies).map(name => ({
  id: v4(),
  name: name,
  description: openexchangeratesCurrencies[name],
  createdAt: format(new Date()),
  updatedAt: format(new Date())
}))

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('currencies', currencies, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('currencies', null, {})
  },

  items: currencies
};
