const format = require('date-fns/format')
const v4 = require('uuid/v4')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl

const DEFAULT_PASSWORD = 'qwerty'

const users = [
  {
    id: v4(),
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
