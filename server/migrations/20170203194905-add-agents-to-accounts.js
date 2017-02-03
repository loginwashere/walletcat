module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'accounts',
      'agentId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'agents',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    )
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('accounts', 'agentId')
  }
}
