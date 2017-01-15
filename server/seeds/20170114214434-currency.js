const format = require('date-fns/format')
const v4 = require('uuid/v4')

const currencies = [
  {
    id: v4(),
    name: 'USD',
    description: 'United States Dollar',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  },
  {
    id: v4(),
    name: 'UAH',
    description: 'Ukrainian Hryvna',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('currencies', currencies, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('currencies', null, {})
  },

  items: currencies
};
