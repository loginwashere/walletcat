module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define('category', {
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
  }, {
    classMethods: {
      associate: function(models) {
        category.belongsTo(models.user)
      }
    },
    tableName: 'categories',
    paranoid: true,
    instanceMethods: {
      toJSON: function () {
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
  return category
}
