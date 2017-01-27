module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'categories',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        name: {
          type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('categories')
  }
}
