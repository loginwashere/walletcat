module.exports = (sequelize, Sequelize) => {
  const transaction = sequelize.define('transaction', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    description: {
      type: Sequelize.TEXT
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
        transaction.hasMany(models.transactionItem)
      }
    },
    tableName: 'transactions',
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
