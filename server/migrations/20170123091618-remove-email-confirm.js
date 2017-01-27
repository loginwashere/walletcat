module.exports = {
  up: function(queryInterface) {
    return queryInterface.removeColumn('users', 'emailConfirm')
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'emailConfirm',
      {
        type: Sequelize.TEXT,
        unique: true
      }
    )
  }
}
