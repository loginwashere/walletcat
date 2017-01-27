module.exports = (sequelize, Sequelize) => sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(255),
    unique: true
  },
  email: {
    type: Sequelize.STRING(255),
    unique: true
  },
  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  avatar: {
    type: Sequelize.STRING(255)
  },
  password: {
    type: Sequelize.STRING(255)
  },
}, {
  tableName: 'users',
  paranoid: true,
  instanceMethods: {
    toJSON: function() {
      const values = Object.assign({}, this.get())
      delete values.password
      delete values.deletedAt
      return values
    }
  }
})
