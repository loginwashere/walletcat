const axios = require('axios')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const models = require('../models')

module.exports = {
  up: function(queryInterface) {
    return models.currency
      .findAll()
      .then(storedCurrencies => axios
        .get('https://openexchangerates.org/api/currencies.json?show_experimental=true')
        .then(response => {
          const storedCurrenciesNames = storedCurrencies.map(c => c.name)
          const currencies = Object.keys(response.data)
            .map(name => (storedCurrenciesNames.indexOf(name) === -1) && {
              id: v4(),
              name: name,
              description: response.data[name],
              createdAt: format(new Date()),
              updatedAt: format(new Date())
            })
            .filter(Boolean)
          return currencies.length
            ? queryInterface.bulkInsert('currencies', currencies, {})
            : Promise.resolve()
        })
      )
  },

  down: function() {
    return Promise.resolve()
  }
}
