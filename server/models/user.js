module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    id: { type: Sequelize.UUID, primaryKey: true },
    username: { type: Sequelize.STRING, unique: true },
    email: { type: Sequelize.STRING, unique: true },
    avatar: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  }, {
    tableName: 'users',
    paranoid: true
  })
}
