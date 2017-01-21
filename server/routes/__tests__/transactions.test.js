const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const format = require('date-fns/format')
const userSeeder = require('../../seeds/20170114212746-user')
const currencySeeder = require('../../seeds/20170114214434-currency')
const userCurrencySeeder = require('../../seeds/20170114214446-user-currency')
const accountSeeder = require('../../seeds/20170114214459-account')
const categorySeeder = require('../../seeds/20170114214453-category')
const transactionSeeder = require('../../seeds/20170114214507-transaction')

chai.use(chaiHttp)

describe('routes : transactions', () => {
  let token
  let server

  before('before', () => {
    server = require('../..')
  })

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

  after('after', () => {
    server.httpServer.close()
  })

  describe('GET /api/transactions', () => {
    it('should respond with all transactions', (done) => {
      chai.request(server.app)
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

  describe('POST /api/transactions', () => {
    it('should create transaction if valid data sent', (done) => {
      chai.request(server.app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        categoryId: categorySeeder.items[0].id,
        fromAccountId: accountSeeder.items[0].id,
        fromAmount: 1000,
        toAccountId: accountSeeder.items[1].id,
        toAmount: 1000,
        description: 'test',
        date: format(new Date()),
      })
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.should.be.a('object')
        res.body.should.include.keys(
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
        res.body.userId.should.equal(userSeeder.items[0].id)
        done()
      })
    })
  })
})
