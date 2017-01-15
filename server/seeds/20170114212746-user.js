const format = require('date-fns/format')
const v4 = require('uuid/v4')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl

const users = [
  {
    id: v4(),
    email: 'admin@mail.com',
    username: 'admin',
    avatar: generateAvatarUrl('admin@mail.com'),
    password: hashPassword('qwerty'),
    createdAt: format(new Date()),
    updatedAt: format(new Date()),
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', users, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  },

  items: users
}
