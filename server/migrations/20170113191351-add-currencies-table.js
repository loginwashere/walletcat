module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'currencies',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(3),
          unique: true
        },
        description: {
          type: Sequelize.TEXT
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
    return queryInterface.dropTable('currencies')
  }
}
