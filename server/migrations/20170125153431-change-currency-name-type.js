module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.changeColumn('currencies', 'name', {
      type: Sequelize.STRING(10),
      allowNull: false
    })
  },

  down: function() {
    return Promise.resolve()
  }
}
