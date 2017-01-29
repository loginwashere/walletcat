module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'fbUserId', {
        type: Sequelize.BIGINT,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'fbAccessToken', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
      queryInterface.addColumn('users', 'fbAccesstokenExpireAt', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.changeColumn('users', 'password', {
        type: Sequelize.STRING(255),
        allowNull: true
      })
    ])
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'fbUserId'),
      queryInterface.removeColumn('users', 'fbAccessToken'),
      queryInterface.removeColumn('users', 'fbAccesstokenExpireAt'),
      queryInterface.changeColumn('users', 'password', {
        type: Sequelize.STRING(255),
        allowNull: false
      })
    ])
  }
}
