module.exports = {
  up: function(queryInterface) {
    return Promise.all([
      queryInterface.sequelize
        .query('ALTER TABLE "accounts" DROP CONSTRAINT IF EXISTS accounts_name;')
        .then(() => queryInterface.removeIndex('accounts', ['name']))
        .then(() => queryInterface.addIndex('accounts', ['userId', 'name'], { indicesType: 'UNIQUE' })),
      queryInterface.sequelize
        .query('ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS categories_name;')
        .then(() => queryInterface.removeIndex('categories', ['name']))
        .then(() => queryInterface.addIndex('categories', ['userId', 'name'], { indicesType: 'UNIQUE' }))
    ])
  },

  down: function(queryInterface) {
    return Promise.all([
      queryInterface.sequelize
        .query('ALTER TABLE "accounts" DROP CONSTRAINT IF EXISTS accounts_userId_name;')
        .then(() => queryInterface.removeIndex('accounts', ['userId', 'name']))
        .then(() => queryInterface.addIndex('accounts', ['name'], { indicesType: 'UNIQUE' })),
      queryInterface.sequelize
        .query('ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS categories_userId_name;')
        .then(() => queryInterface.removeIndex('categories', ['userId', 'name']))
        .then(() => queryInterface.addIndex('categories', ['name'], { indicesType: 'UNIQUE' }))
    ])
  }
}
