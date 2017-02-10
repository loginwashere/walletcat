const userSeederItems = require('./20170114212746-user').items

const DEFAULT_DATE = '1995-02-10 18:45:43.948+00'

const agents = [
  {
    id: '00000000-5a23-4ef3-0004-000000000000',
    userId: userSeederItems[0].id,
    name: 'Default agent (Me)',
    description: 'Yeap, that\'s me',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  },
  {
    id: '00000000-5a23-4ef3-0004-000000000001',
    userId: userSeederItems[0].id,
    name: 'John Smith',
    description: 'Business client',
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('agents', agents, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('agents', null, {})
  },

  items: agents,

  itemsById: agents
    .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {}),
}
