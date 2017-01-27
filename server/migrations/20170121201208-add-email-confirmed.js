module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'emailConfirmed',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    )
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('users', 'emailConfirmed')
  }
}
