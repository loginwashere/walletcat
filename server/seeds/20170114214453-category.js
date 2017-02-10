const userSeederItems = require('./20170114212746-user').items

const DEFAULT_DATE = '1995-02-10 18:45:43.948+00'

const categories = [
  {
    id: '00000000-5a23-4ef3-0003-000000000000',
    userId: userSeederItems[0].id,
    name: 'Fast food',
    description: 'Some fast food',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  },
  {
    id: '00000000-5a23-4ef3-0003-000000000001',
    userId: userSeederItems[0].id,
    name: 'Payment',
    description: 'Receive funds for work',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('categories', categories, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('categories', null, {})
  },

  items: categories,

  itemsById: categories
    .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {}),
}
