module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users',
      {
        id: { type: Sequelize.UUID, primaryKey: true },
        username: { type: Sequelize.STRING, unique: true },
        email: { type: Sequelize.STRING, unique: true },
        avatar: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        },
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
