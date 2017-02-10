module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'transaction_items',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        transactionId: {
          type: Sequelize.UUID,
          references: {
            model: 'transactions',
            key: 'id'
          }
        },
        accountId: {
          type: Sequelize.UUID,
          references: {
            model: 'accounts',
            key: 'id'
          }
        },
        type: {
          type: Sequelize.ENUM('debit', 'credit'),
          allowNull: false
        },
        amount: {
          type: Sequelize.DECIMAL(19, 8),
          allowNull: false
        },
        rate: {
          type: Sequelize.DECIMAL(23, 12),
          allowNull: false
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
    return queryInterface.dropTable('transaction_items')
  }
}
