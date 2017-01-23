module.exports = (sequelize, Sequelize) => {
  return sequelize.define('currency', {
    id: { type: Sequelize.UUID, primaryKey: true },
    name: { type: Sequelize.STRING(3), unique: true },
    description: { type: Sequelize.STRING },
  }, {
    tableName: 'currencies',
    paranoid: true,
    instanceMethods: {
      toJSON: function () {
        const values = Object.assign({}, this.get())
        delete values.deletedAt
        return values
      }
    }
  })
}
