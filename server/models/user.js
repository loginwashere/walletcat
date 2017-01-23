module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    id: { type: Sequelize.UUID, primaryKey: true },
    username: { type: Sequelize.STRING, unique: true },
    email: { type: Sequelize.STRING, unique: true },
    emailConfirmed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    avatar: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  }, {
    tableName: 'users',
    paranoid: true,
    instanceMethods: {
      toJSON: function () {
        const values = Object.assign({}, this.get())
        delete values.password
        delete values.deletedAt
        return values
      }
    }
  })
}
