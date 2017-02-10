const v4 = require('uuid/v4')
const models = require('../models')

module.exports = {
  up: function(queryInterface) {
    return models.sequelize.query(
        'SELECT * FROM public.transactions',
        { type: models.sequelize.QueryTypes.SELECT }
      )
      .then(transactions => {
        const transactionCreditItems = transactions.map(transaction => ({
          id: v4(),
          transactionId: transaction.id,
          accountId: transaction.fromAccountId,
          type: 'credit',
          amount: transaction.fromAmount,
          rate: transaction.fromRate,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          deletedAt: transaction.deletedAt
        }))
        const transactionDebitItems = transactions.map(transaction => ({
          id: v4(),
          transactionId: transaction.id,
          accountId: transaction.toAccountId,
          type: 'debit',
          amount: transaction.toAmount,
          rate: transaction.toRate,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          deletedAt: transaction.deletedAt
        }))
        const transactionItems = transactionCreditItems.concat(transactionDebitItems)
        let promise
        if (transactionItems.length) {
          promise = queryInterface.bulkInsert('transaction_items', transactionItems, {})
        } else {
          promise = Promise.resolve()
        }
        return promise
          .then(() => Promise.all([
            queryInterface.removeColumn('transactions', 'fromAccountId'),
            queryInterface.removeColumn('transactions', 'fromAmount'),
            queryInterface.removeColumn('transactions', 'fromRate'),
            queryInterface.removeColumn('transactions', 'toAccountId'),
            queryInterface.removeColumn('transactions', 'toAmount'),
            queryInterface.removeColumn('transactions', 'toRate'),
          ]))
      })
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('transactions', 'fromAccountId', {
        type: Sequelize.UUID,
        references: {
          model: 'accounts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }),
      queryInterface.addColumn('transactions', 'fromAmount', {
        type: Sequelize.DECIMAL(19, 8),
      }),
      queryInterface.addColumn('transactions', 'fromRate', {
        type: Sequelize.DECIMAL(23, 12),
      }),
      queryInterface.addColumn('transactions', 'toAccountId', {
        type: Sequelize.UUID,
        references: {
          model: 'accounts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }),
      queryInterface.addColumn('transactions', 'toAmount', {
        type: Sequelize.DECIMAL(19, 8),
      }),
      queryInterface.addColumn('transactions', 'toRate', {
        type: Sequelize.DECIMAL(23, 12),
      })
    ])
  }
}
