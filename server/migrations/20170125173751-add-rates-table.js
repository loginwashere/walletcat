module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'rates',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        baseId: {
          type: Sequelize.UUID,
          references: {
            model: 'currencies',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        currencyId: {
          type: Sequelize.UUID,
          references: {
            model: 'currencies',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        rate: {
          type: Sequelize.DECIMAL(23, 12)
        },
        date: {
          type: Sequelize.DATE
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      }
    )
    .then(() => queryInterface.addIndex(
      'rates',
      ['baseId', 'currencyId'],
      { indicesType: 'UNIQUE' }
    ))
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('rates')
  }
}
