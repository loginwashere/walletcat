module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'userCurrencies',
      {
        id: { type: Sequelize.UUID, primaryKey: true },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        currencyId: {
          type: Sequelize.UUID,
          references: {
            model: 'currencies',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
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
    return queryInterface.dropTable('userCurrencies')
  }
}
