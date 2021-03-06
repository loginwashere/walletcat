module.exports = (sequelize, Sequelize) => sequelize.define('currency', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(10),
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  },
}, {
  tableName: 'currencies',
  paranoid: true,
  instanceMethods: {
    toJSON: function() {
      const values = Object.assign({}, this.get())
      delete values.deletedAt
      return values
    }
  }
})
