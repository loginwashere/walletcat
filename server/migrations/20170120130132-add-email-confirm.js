module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'emailConfirm',
      {
        type: Sequelize.TEXT,
        unique: true
      }
    )
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('users', 'emailConfirm')
  }
}
