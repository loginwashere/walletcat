const format = require('date-fns/format')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl

const DEFAULT_PASSWORD = 'qwerty'

const users = [
  {
    id: '00000000-5a23-4ef3-0000-000000000000',
    email: 'admin@mail.com',
    username: 'admin',
    avatar: generateAvatarUrl('admin@mail.com'),
    password: hashPassword(DEFAULT_PASSWORD),
    createdAt: format(new Date()),
    updatedAt: format(new Date()),
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

  DEFAULT_PASSWORD
}
