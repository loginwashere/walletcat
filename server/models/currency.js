module.exports = (sequelize, Sequelize) => {
  return sequelize.define('currency', {
    id: { type: Sequelize.UUID, primaryKey: true },
    name: { type: Sequelize.STRING(3), unique: true },
    description: { type: Sequelize.STRING },
  }, {
    tableName: 'currencies',
    paranoid: true
  })
}
