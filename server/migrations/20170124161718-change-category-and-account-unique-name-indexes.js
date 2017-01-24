module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(
          'ALTER TABLE "accounts" DROP CONSTRAINT IF EXISTS accounts_name;'
        ).then(() => {
          return  queryInterface.removeIndex('accounts', ['name'])
            .then(result => {
              return queryInterface.addIndex('accounts', ['userId', 'name'], { indicesType: 'UNIQUE' })
            })
        }),
      queryInterface.sequelize
        .query(
          'ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS categories_name;'
        ).then(() => {
          return queryInterface.removeIndex('categories', ['name'])
            .then(result => {
              return queryInterface.addIndex('categories', ['userId', 'name'], { indicesType: 'UNIQUE' })
            })
      })
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(
          'ALTER TABLE "accounts" DROP CONSTRAINT IF EXISTS accounts_userId_name;'
        ).then(() => {
          return queryInterface.removeIndex('accounts', ['userId', 'name'])
            .then(result => {
              return queryInterface.addIndex('accounts', ['name'], { indicesType: 'UNIQUE' })
            })
        }),
      queryInterface.sequelize
        .query(
          'ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS categories_userId_name;'
        ).then(() => {
          return queryInterface.removeIndex('categories', ['userId', 'name'])
            .then(result => {
              return queryInterface.addIndex('categories', ['name'], { indicesType: 'UNIQUE' })
            })
        })
    ])
  }
}
