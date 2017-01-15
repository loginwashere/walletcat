const Umzug = require('umzug')

const models = require('../../models')
const generateToken = require('../../utils').generateToken

const umzug = new Umzug({
  migrations: {
    params: [models.sequelize.getQueryInterface(), models.Sequelize, function() {
      throw new Error(
        'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
      )
    }],
    path: 'server/migrations'
  }
})

function all(promises) {
  const accumulator = []
  let ready = Promise.resolve(null)

  promises.forEach((promise, ndx) => {
    ready = ready.then(() => {
      return promise()
    }).then((value) => {
      accumulator[ndx] = { status: 'resolved', value: value }
    })
    .catch(err => accumulator[ndx] = { status: 'rejected', value: err })
  })

  return ready.then(() => accumulator)
}

function getTokenByUsername(username) {
  return models.user.findOne({ where: { username: 'admin' } })
    .then(user => {
      return generateToken(user.id)
    })
}

module.exports = {
  umzug,
  all,
  getTokenByUsername
}