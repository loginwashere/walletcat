const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const userSeeder = require('../../seeds').userSeeder
const currencySeeder = require('../../seeds').currencySeeder
const helpers = require('./helpers')

chai.use(chaiHttp)

describe('routes : currencies', () => {
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
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  describe('GET /api/currencies', () => {
    it('should respond with all currencies', (done) => {
      chai.request(server)
        .get('/api/currencies')
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.currencies.length.should.eql(10)
          Object.keys(res.body.currencies[0]).should.eql([
            'id',
            'name',
            'description',
            'createdAt',
            'updatedAt'
          ])
          done()
        })
    })
  })
})
