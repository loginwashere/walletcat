const v4 = require('uuid/v4')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const userSeeder = require('../../seeds/20170114212746-user')
const currencySeeder = require('../../seeds/20170114214434-currency')
const userCurrencySeeder = require('../../seeds/20170114214446-user-currency')
const accountSeeder = require('../../seeds/20170114214459-account')
const NotFoundError = require('../../errors/not-found')

chai.use(chaiHttp)

describe('routes : accounts', () => {
  let token
  let server = {}

  before('before', () => {
    server.app = require('../../server')()
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
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  describe('GET /api/accounts', () => {
    it('should respond with all accounts', (done) => {
      chai.request(server.app)
      .get('/api/accounts')
      .set('Authorization', `Bearer ${token.value}`)
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.accounts.length.should.eql(2)
        Object.keys(res.body.accounts[0]).sort().should.eql([
          'id',
          'name',
          'description',
          'amount',
          'createdAt',
          'updatedAt',
          'userId',
          'currencyId'
        ].sort())
        done()
      })
    })
  })

  describe('POST /api/accounts', () => {
    it('should create new account when provide valid data', (done) => {
      chai.request(server.app)
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        name: 'Cool Bank USD',
        description: 'Account in Cool Bank in USD',
        currencyId: userCurrencySeeder.items[0].id
      })
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.should.be.a('object')
        Object.keys(res.body).sort().should.eql([
          'id',
          'name',
          'description',
          'amount',
          'createdAt',
          'updatedAt',
          'userId',
          'currencyId'
        ].sort())
        done()
      })
    })
  })

  describe('PUT /api/accounts/:accountId', () => {
    it('should update account when provide valid data', (done) => {
      const accountId = accountSeeder.items[0].id
      const name = 'Cool Bank 2 USD'
      const description = 'Account in Cool Bank 2 in USD'
      const currencyId = userCurrencySeeder.items[1].id
      const amount = 10
      chai.request(server.app)
      .put(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        name,
        description,
        currencyId,
        amount
      })
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.should.be.a('object')
        Object.keys(res.body).sort().should.eql([
          'id',
          'name',
          'description',
          'amount',
          'createdAt',
          'updatedAt',
          'userId',
          'currencyId'
        ].sort())
        res.body.userId.should.equal(userSeeder.items[0].id)
        res.body.id.should.equal(accountId)
        res.body.name.should.equal(name)
        res.body.description.should.equal(description)
        res.body.currencyId.should.equal(currencyId)
        res.body.amount.should.equal(amount)
        done()
      })
    })

    it('should return error when update not existing account', (done) => {
      const notExistingAccountId = v4()
      const name = 'Cool Bank 2 USD'
      const description = 'Account in Cool Bank 2 in USD'
      const currencyId = userCurrencySeeder.items[1].id
      const amount = 10
      chai.request(server.app)
      .put(`/api/accounts/${notExistingAccountId}`)
      .set('Authorization', `Bearer ${token.value}`)
      .send({
        name,
        description,
        currencyId,
        amount
      })
      .end((err, res) => {
        err.response.status.should.equal(404)
        err.response.type.should.equal('application/json')
        err.response.body.should.eql(new NotFoundError('Account not found'))
        done()
      })
    })
  })

  describe('DELETE /api/accounts/:accountId', () => {
    it('should delete account when provide valid data', (done) => {
      const accountId = accountSeeder.items[0].id
      chai.request(server.app)
      .delete(`/api/accounts/${accountId}`)
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

    it('should return error when delete not exisiting account', (done) => {
      const notExistingAccountId = v4()
      chai.request(server.app)
      .delete(`/api/accounts/${notExistingAccountId}`)
      .set('Authorization', `Bearer ${token.value}`)
      .end((err, res) => {
        err.response.status.should.equal(404)
        err.response.type.should.equal('application/json')
        err.response.body.should.eql(new NotFoundError('Account not found'))
        done()
      })
    })
  })
})
