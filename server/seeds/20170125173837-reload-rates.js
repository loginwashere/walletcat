const axios = require('axios')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const models = require('../models')
const config = require('../config')
const all = require('../routes/__tests__/helpers').all

module.exports = {
  up: function() {
    const insertOrUpdate = rate => models.rate
      .findOne({
        where: {
          $and: [
            { baseId: rate.baseId },
            { currencyId: rate.currencyId }
          ]
        }
      })
      .then(foundRate => foundRate
        ? foundRate.update({
          rate: rate.rate,
          date: rate.date,
          updatedAt: format(new Date())
        })
        : models.rate.create(rate))

    return models.currency
      .findAll()
      .then(storedCurrencies => axios
        .get('https://openexchangerates.org/api/latest.json', {
          params: {
            app_id: config.openexchangeratesAppId,
            show_experimental: true
          }
        })
        .then(response => {
          const openexchangeratesRates = response.data
          const currenciesByName = storedCurrencies
            .reduce((obj, item) => Object.assign({}, obj, { [item.name]: item }), {})
          const rates = Object.keys(openexchangeratesRates.rates).map(name => ({
            id: v4(),
            baseId: currenciesByName[openexchangeratesRates.base].id,
            currencyId: currenciesByName[name].id,
            date: format(new Date(openexchangeratesRates.timestamp * 1000)),
            rate: openexchangeratesRates.rates[name],
            createdAt: format(new Date()),
            updatedAt: format(new Date())
          }))
          return rates.length
            ? all(rates.map(rate => () => insertOrUpdate(rate)))
            : Promise.resolve()
        })
      )
  },

  down: function() {
    return Promise.resolve()
  }
}
