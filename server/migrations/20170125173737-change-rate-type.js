module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('transactions', 'fromRate', {
        type: Sequelize.DECIMAL(23, 12),
        allowNull: false
      }),
      queryInterface.changeColumn('transactions', 'toRate', {
        type: Sequelize.DECIMAL(23, 12),
        allowNull: false
      })
    ])
  },

  down: function() {
    return Promise.resolve()
  }
}
