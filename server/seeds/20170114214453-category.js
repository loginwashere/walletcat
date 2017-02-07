const format = require('date-fns/format')
const userSeederItems = require('./20170114212746-user').items

const categories = [
  {
    id: '00000000-5a23-4ef3-0003-000000000000',
    userId: userSeederItems[0].id,
    name: 'Fast food',
    description: 'Some fast food',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  },
  {
    id: '00000000-5a23-4ef3-0003-000000000001',
    userId: userSeederItems[0].id,
    name: 'Payment',
    description: 'Receive funds for work',
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('categories', categories, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('categories', null, {})
  },

  items: categories
}
