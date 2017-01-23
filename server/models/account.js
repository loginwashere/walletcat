module.exports = (sequelize, Sequelize) => {
  const account = sequelize.define('account', {
    id: { type: Sequelize.UUID,  primaryKey: true },
    name: { type: Sequelize.STRING, unique: true },
    description: { type: Sequelize.STRING },
    amount: { type: Sequelize.DECIMAL(19, 6) },
  }, {
    classMethods: {
      associate: models => {
        account.belongsTo(models.user)
        account.belongsTo(models.userCurrency, { as: 'currency' })
      }
    },
    tableName: 'accounts',
    paranoid: true,
    instanceMethods: {
      toJSON: function () {
        const values = Object.assign({}, this.get())
        delete values.deletedAt
        return values
      }
    }
  })
  return account
}
