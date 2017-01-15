const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const userSeeder = require('../../seeds/20170114212746-user')
const currencySeeder = require('../../seeds/20170114214434-currency')
const userCurrencySeeder = require('../../seeds/20170114214446-user-currency')
const accountSeeder = require('../../seeds/20170114214459-account')
const categorySeeder = require('../../seeds/20170114214453-category')
const transactionSeeder = require('../../seeds/20170114214507-transaction')

chai.use(chaiHttp)

const server = require('../..')

describe('routes : transactions', () => {
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
      () => categorySeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => transactionSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  describe('GET /api/transactions', () => {
    it('should respond with all transactions', (done) => {
      chai.request(server)
      .get('/api/transactions')
      .set('Authorization', `Bearer ${token.value}`)
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.transactions.length.should.eql(1)
        res.body.transactions[0].should.include.keys(
          'id',
          'userId',
          'categoryId',
          'fromAccountId',
          'fromAmount',
          'toAccountId',
          'toAmount',
          'description',
          'date',
          'createdAt',
          'updatedAt'
        )
        done()
      })
    })
  })
})