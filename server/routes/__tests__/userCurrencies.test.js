const v4 = require('uuid/v4')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const userSeeder = require('../../seeds/20170114212746-user')
const currencySeeder = require('../../seeds/20170114214434-currency')
const userCurrencySeeder = require('../../seeds/20170114214446-user-currency')
const NotFoundError = require('../../errors/not-found')

chai.use(chaiHttp)

describe('routes : userCurrencies', () => {
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
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  describe('GET /api/user-currencies', () => {
    it('should respond with all userCurrencies', (done) => {
      chai.request(server)
        .get('/api/user-currencies')
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.userCurrencies.length.should.eql(2)
          Object.keys(res.body.userCurrencies[0]).sort().should.eql([
            'id',
            'userId',
            'currencyId',
            'createdAt',
            'updatedAt'
          ].sort())
        done()
      })
    })
  })

  describe('POST /api/user-currencies', () => {
    it('should create userCurrency when provided valid data', (done) => {
      chai.request(server)
        .post('/api/user-currencies')
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          currencyId: currencySeeder.items[1].id
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          Object.keys(res.body).sort().should.eql([
            'id',
            'userId',
            'currencyId',
            'createdAt',
            'updatedAt'
          ].sort())
          res.body.userId.should.equal(userSeeder.items[0].id)
          res.body.currencyId.should.equal(currencySeeder.items[1].id)
          done()
        })
    })
  })

  describe('DELETE /api/user-currencies/:userCurrencyId', () => {
    it('should create userCurrency when provided valid data', (done) => {
      const userCurrencyId = userCurrencySeeder.items[0].id
      chai.request(server)
        .delete(`/api/user-currencies/${userCurrencyId}`)
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

    it('should return not found error when delete userCurrency which is not exist', (done) => {
      const notExistingUserCurrencyId = v4()
      chai.request(server)
        .delete(`/api/user-currencies/${notExistingUserCurrencyId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          err.response.status.should.equal(404)
          err.response.type.should.equal('application/json')
          err.response.body.should.eql(new NotFoundError('User currency not found'))
          done()
        })
    })
  })
})
