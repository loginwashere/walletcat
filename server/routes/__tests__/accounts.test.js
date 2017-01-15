const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const userSeeder = require('../../seeds/20170114212746-user')
const currencySeeder = require('../../seeds/20170114214434-currency')
const userCurrencySeeder = require('../../seeds/20170114214446-user-currency')
const accountSeeder = require('../../seeds/20170114214459-account')

chai.use(chaiHttp)

const server = require('../..')

describe('routes : accounts', () => {
  let token

  beforeEach('get token', function() {
    return helpers.all([
      () => models.sequelize.authenticate(),
      () => helpers.umzug.down({ to: 0 }),
      () => helpers.umzug.up(),
      () => userSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => currencySeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => userCurrencySeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => accountSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  describe('GET /api/accounts', () => {
    it('should respond with all accounts', (done) => {
      chai.request(server)
      .get('/api/accounts')
      .set('Authorization', `Bearer ${token.value}`)
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.accounts.length.should.eql(2)
        res.body.accounts[0].should.include.keys(
          'id',
          'name',
          'description',
          'createdAt',
          'updatedAt',
          'currencyId',
          'userId',
          'amount'
        )
        done()
      })
    })
  })
})
