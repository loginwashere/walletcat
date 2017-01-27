module.exports = (sequelize, Sequelize) => {
  const account = sequelize.define('account', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(255)
    },
    description: {
      type: Sequelize.TEXT
    },
    amount: {
      type: Sequelize.DECIMAL(19, 8),
      allowNull: false,
      defaultValue: 0
    },
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
      toJSON: function() {
        const values = Object.assign({}, this.get())
        delete values.deletedAt
        return values
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['userId', 'name']
      }
    ]
  })
  return account
}
