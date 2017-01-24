module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'transactions',
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
        fromAccountId: {
          type: Sequelize.UUID,
          references: {
              model: 'accounts',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        toAccountId: {
          type: Sequelize.UUID,
          references: {
              model: 'accounts',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        categoryId: {
          type: Sequelize.UUID,
          references: {
              model: 'categories',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        fromAmount: {
          type: Sequelize.DECIMAL(19, 6)
        },
        toAmount: {
          type: Sequelize.DECIMAL(19, 6)
        },
        fromRate: {
          type: Sequelize.DECIMAL(10, 6)
        },
        toRate: {
          type: Sequelize.DECIMAL(10, 6)
        },
        date: {
          type: Sequelize.DATE
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

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('transactions')
  }
}
