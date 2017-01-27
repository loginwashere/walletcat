module.exports = (sequelize, Sequelize) => {
  const userCurrency = sequelize.define('userCurrency', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
  }, {
    classMethods: {
      associate: function(models) {
        userCurrency.belongsTo(models.user)
        userCurrency.belongsTo(models.currency)
      }
    },
    tableName: 'userCurrencies',
    paranoid: true,
    instanceMethods: {
      toJSON: function() {
        const values = Object.assign({}, this.get())
        delete values.deletedAt
        return values
      }
    }
  })
  return userCurrency
}