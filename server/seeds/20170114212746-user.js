const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl

const DEFAULT_PASSWORD = 'qwerty'

const DEFAULT_DATE = '1995-02-10 18:45:43.948+00'

const users = [
  {
    id: '00000000-5a23-4ef3-0000-000000000000',
    email: 'admin@mail.com',
    username: 'admin',
    avatar: generateAvatarUrl('admin@mail.com'),
    password: hashPassword(DEFAULT_PASSWORD),
    createdAt: DEFAULT_DATE,
    updatedAt: DEFAULT_DATE,
  }
]

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('users', users, {})
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('users', null, {})
  },

  items: users,

  itemsById: users
    .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {}),

  DEFAULT_PASSWORD
}
