module.exports = (sequelize, Sequelize) => {
  const transaction = sequelize.define('transaction', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    description: {
      type: Sequelize.TEXT
    },
    fromAmount: {
      type: Sequelize.DECIMAL(19, 8),
      allowNull: false
    },
    toAmount: {
      type: Sequelize.DECIMAL(19, 8),
      allowNull: false
    },
    fromRate: {
      type: Sequelize.DECIMAL(19, 8),
      allowNull: false
    },
    toRate: {
      type: Sequelize.DECIMAL(19, 8),
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        transaction.belongsTo(models.category)
        transaction.belongsTo(models.user)
        transaction.belongsTo(models.account, { as: 'fromAccount' })
        transaction.belongsTo(models.account, { as: 'toAccount' })
      }
    },
    tableName: 'transactions',
    paranoid: true,
    instanceMethods: {
      toJSON: function () {
        const values = Object.assign({}, this.get())
        delete values.deletedAt
        return values
      }
    }
  })
  return transaction
}
