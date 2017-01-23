module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    id: { type: Sequelize.UUID, primaryKey: true },
    username: { type: Sequelize.STRING, unique: true },
    email: { type: Sequelize.STRING, unique: true },
    emailConfirm: { type: Sequelize.TEXT, unique: true },
    emailConfirmed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    avatar: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  }, {
    tableName: 'users',
    paranoid: true
  })
}
