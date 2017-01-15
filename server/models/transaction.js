module.exports = (sequelize, Sequelize) => {
  const transaction = sequelize.define('transaction', {
    id: { type: Sequelize.UUID,  primaryKey: true },
    description: { type: Sequelize.STRING },
    fromAmount: { type: Sequelize.DECIMAL(19, 6) },
    toAmount: { type: Sequelize.DECIMAL(19, 6) },
    fromRate: { type: Sequelize.DECIMAL(10, 6) },
    toRate: { type: Sequelize.DECIMAL(10, 6) },
    date: { type: Sequelize.DATE },
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
    paranoid: true
  })
  return transaction
}
