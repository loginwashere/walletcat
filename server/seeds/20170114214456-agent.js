const format = require('date-fns/format')
const v4 = require('uuid/v4')
const userSeederItems = require('./20170114212746-user').items

const categories = [
  {
    id: v4(),
    userId: userSeederItems[0].id,
    name: 'Default agent (Me)',
    description: 'Yeap, that\'s me',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  },
  {
    id: v4(),
    userId: userSeederItems[0].id,
    name: 'John Smith',
    description: 'Business client',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('agents', categories, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('agents', null, {})
  },

  items: categories
}
