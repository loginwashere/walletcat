module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'accounts',
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
        currencyId: {
          type: Sequelize.UUID,
          references: {
              model: 'userCurrencies',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        amount: {
          type: Sequelize.DECIMAL(19, 6)
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
    return queryInterface.dropTable('accounts')
  }
}
