module.exports = (sequelize, Sequelize) => {
  const rate = sequelize.define('rate', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    rate: {
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
        rate.belongsTo(models.currency, { as: 'base' })
        rate.belongsTo(models.currency, { as: 'currency' })
      }
    },
    tableName: 'rates',
    paranoid: true,
    timestamps: true,
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
        fields: ['baseId', 'currencyId']
      }
    ]
  })
  return rate
}
