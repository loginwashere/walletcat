const v4 = require('uuid/v4')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const format = require('date-fns/format')
const userSeeder = require('../../seeds').userSeeder
const currencySeeder = require('../../seeds').currencySeeder
const userCurrencySeeder = require('../../seeds').userCurrencySeeder
const agentSeeder = require('../../seeds').agentSeeder
const accountSeeder = require('../../seeds').accountSeeder
const categorySeeder = require('../../seeds').categorySeeder
const transactionSeeder = require('../../seeds').transactionSeeder
const NotFoundError = require('../../errors/not-found')

chai.use(chaiHttp)

describe('routes : transactions', () => {
  let token
  let server

  before('before', () => {
    server = require('../../server')()
  })

  beforeEach('get token', function() {
    return helpers.all([
      () => models.sequelize.authenticate(),
      () => helpers.umzug.down({ to: 0 }),
      () => helpers.umzug.up(),
      () => userSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => currencySeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => userCurrencySeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => agentSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
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
          Object.keys(res.body.transactions[0]).sort().should.eql([
            'id',
            'description',
            'fromAmount',
            'toAmount',
            'fromRate',
            'toRate',
            'date',
            'createdAt',
            'updatedAt',
            'categoryId',
            'userId',
            'fromAccountId',
            'toAccountId'
          ].sort())
          done()
        })
    })
  })

  describe('POST /api/transactions', () => {
    it('should create transaction if valid data sent', (done) => {
      chai.request(server)
        .post('/api/transactions')
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          categoryId: categorySeeder.items[0].id,
          fromAccountId: accountSeeder.items[0].id,
          fromAmount: 1000,
          toAccountId: accountSeeder.items[1].id,
          toAmount: 1000,
          fromRate: 1,
          toRate: 1,
          description: 'test',
          date: format(new Date()),
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          Object.keys(res.body).sort().should.eql([
            'id',
            'description',
            'fromAmount',
            'toAmount',
            'fromRate',
            'toRate',
            'date',
            'createdAt',
            'updatedAt',
            'categoryId',
            'userId',
            'fromAccountId',
            'toAccountId'
          ].sort())
          res.body.userId.should.equal(userSeeder.items[0].id)
          done()
        })
    })
  })

  describe('PUT /api/transactions/:transactionId', () => {
    it('should update transaction if valid data sent', (done) => {
      const transacionId = transactionSeeder.items[0].id
      chai.request(server)
        .put(`/api/transactions/${transacionId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          categoryId: categorySeeder.items[0].id,
          fromAccountId: accountSeeder.items[1].id,
          fromAmount: 100,
          toAccountId: accountSeeder.items[0].id,
          toAmount: 100,
          fromRate: 2,
          toRate: 2,
          description: 'new test',
          date: format(new Date()),
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          Object.keys(res.body).sort().should.eql([
            'id',
            'description',
            'fromAmount',
            'toAmount',
            'fromRate',
            'toRate',
            'date',
            'createdAt',
            'updatedAt',
            'categoryId',
            'userId',
            'fromAccountId',
            'toAccountId'
          ].sort())
          res.body.userId.should.equal(userSeeder.items[0].id)
          done()
        })
    })

    it('should return error when try to update not existing transation', (done) => {
      const notExistingTransacionId = v4()
      chai.request(server)
        .put(`/api/transactions/${notExistingTransacionId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          categoryId: categorySeeder.items[0].id,
          fromAccountId: accountSeeder.items[1].id,
          fromAmount: 100,
          toAccountId: accountSeeder.items[0].id,
          toAmount: 100,
          fromRate: 2,
          toRate: 2,
          description: 'new test',
          date: format(new Date()),
        })
        .end((err, res) => {
          should.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.should.eql(new NotFoundError('Transaction not found'))
          done()
        })
    })
  })

  describe('DELETE /api/transactions/:transactionId', () => {
    it('should delete transaction if valid data sent', (done) => {
      const transacionId = transactionSeeder.items[0].id
      chai.request(server)
        .delete(`/api/transactions/${transacionId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(204)
          res.type.should.equal('')
          res.body.should.be.a('object')
          res.body.should.eql({})
          done()
        })
    })

    it('should return error when try to delete not existing transation', (done) => {
      const notExistingTransacionId = v4()
      chai.request(server)
        .delete(`/api/transactions/${notExistingTransacionId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.should.eql(new NotFoundError('Transaction not found'))
          done()
        })
    })
  })
})
