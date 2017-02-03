const format = require('date-fns/format')
const v4 = require('uuid/v4')
const models = require('../models')

module.exports = {
  up: function(queryInterface) {
    return models.user
      .findAll({
        paranoid: false
      })
      .then(users => {
        const agents = users.map(user => ({
          id: v4(),
          name: 'Me',
          userId: user.id,
          createdAt: format(new Date()),
          updatedAt: format(new Date())
        }))
        if (!agents.length) {
          return Promise.resolve()
        }
        return queryInterface.bulkInsert('agents', agents, {})
          .then(() => models.account
            .findAll({
              paranoid: false
            })
            .then(accounts => {
              if (!accounts.length) {
                return Promise.resolve()
              }
              const agentsByUserId = agents.reduce(
                (result, agent) => Object.assign({}, result, { [agent.userId]: agent }),
                {}
              )
              const promises = accounts.map(
                account => account.update({
                  agentId: agentsByUserId[account.userId].id
                })
              )
              return Promise.all(promises)
            })
          )
      })
  },

  down: function() {
    return Promise.resolve()
  }
}
