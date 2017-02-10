const format = require('date-fns/format')
const leftpad = require('../utils/leftpad')

const DEFAULT_DATE = '1995-02-10 18:45:43.948+00'

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
const openexchangeratesRates = require('./files/rates/openexchangerates_with_experimental')
const currencies = require('./20170114214434-currency').items
const currenciesByName = currencies.reduce((obj, item) => Object.assign({}, obj, { [item.name]: item }), {})

const rates = Object.keys(openexchangeratesRates.rates).map((name, index) => ({
  id: `00000000-5a23-4ef3-0007-000000000${leftpad(index, 3, 0)}`,
  baseId: currenciesByName[openexchangeratesRates.base].id,
  currencyId: currenciesByName[name].id,
  date: format(new Date(openexchangeratesRates.timestamp * 1000)),
  rate: openexchangeratesRates.rates[name],
  createdAt: DEFAULT_DATE,
  updatedAt: DEFAULT_DATE
}))

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('rates', rates, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('rates', null, {})
  },

  items: rates,

  itemsById: rates
    .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {}),
}
