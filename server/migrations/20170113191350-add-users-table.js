module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        username: {
          type: Sequelize.STRING(255),
          unique: true
        },
        email: {
          type: Sequelize.STRING(255),
          unique: true
        },
        avatar: {
          type: Sequelize.STRING(255)
        },
        password: {
          type: Sequelize.STRING(255)
        },
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

  down: function(queryInterface) {
    return queryInterface.dropTable('users')
  }
}
