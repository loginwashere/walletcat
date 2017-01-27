module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('accounts', 'amount', {
        type: Sequelize.DECIMAL(19, 8),
        allowNull: false,
        defaultValue: 0
      }),
      queryInterface.changeColumn('transactions', 'fromAmount', {
        type: Sequelize.DECIMAL(19, 8),
        allowNull: false
      }),
      queryInterface.changeColumn('transactions', 'toAmount', {
        type: Sequelize.DECIMAL(19, 8),
        allowNull: false
      }),
      queryInterface.changeColumn('transactions', 'fromRate', {
        type: Sequelize.DECIMAL(19, 8),
        allowNull: false
      }),
      queryInterface.changeColumn('transactions', 'toRate', {
        type: Sequelize.DECIMAL(19, 8),
        allowNull: false
      }),
      queryInterface.changeColumn('transactions', 'date', {
        type: Sequelize.DATE,
        allowNull: false
      }),
    ])
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('accounts', 'amount', {
        type: Sequelize.DECIMAL(19, 6)
      }),
      queryInterface.changeColumn('transactions', 'fromAmount', {
        type: Sequelize.DECIMAL(19, 6)
      }),
      queryInterface.changeColumn('transactions', 'toAmount', {
        type: Sequelize.DECIMAL(19, 6)
      }),
      queryInterface.changeColumn('transactions', 'fromRate', {
        type: Sequelize.DECIMAL(10, 6)
      }),
      queryInterface.changeColumn('transactions', 'toRate', {
        type: Sequelize.DECIMAL(10, 6)
      }),
      queryInterface.changeColumn('transactions', 'date', {
        type: Sequelize.DATE
      }),
    ])
  }
}
