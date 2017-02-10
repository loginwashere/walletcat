module.exports = (sequelize, Sequelize) => {
  const transaction = sequelize.define('transactionItem', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    amount: {
      type: Sequelize.DECIMAL(19, 8),
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM('debit', 'credit'),
      allowNull: false
    },
    rate: {
      type: Sequelize.DECIMAL(19, 8),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        transaction.belongsTo(models.transaction)
        transaction.belongsTo(models.account)
      }
    },
    tableName: 'transaction_items',
    paranoid: true,
    instanceMethods: {
      toJSON: function() {
        const values = Object.assign({}, this.get())
        delete values.deletedAt
        return values
      }
    }
  })
  return transaction
}
