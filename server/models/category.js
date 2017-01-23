module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define('category', {
    id: { type: Sequelize.UUID,  primaryKey: true },
    name: { type: Sequelize.STRING, unique: true },
    description: { type: Sequelize.STRING },
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
    }
  })
  return category
}
