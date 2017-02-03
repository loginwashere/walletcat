module.exports = (sequelize, Sequelize) => {
  const agent = sequelize.define('agent', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(255)
    },
    description: {
      type: Sequelize.TEXT
    },
  }, {
    classMethods: {
      associate: function(models) {
        agent.belongsTo(models.user)
      }
    },
    tableName: 'agents',
    paranoid: true,
    instanceMethods: {
      toJSON: function() {
        const values = Object.assign({}, this.get())
        delete values.deletedAt
        return values
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['userId', 'name']
      }
    ]
  })
  return agent
}
