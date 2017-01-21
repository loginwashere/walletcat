const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const userSeeder = require('../../seeds/20170114212746-user')
const currencySeeder = require('../../seeds/20170114214434-currency')
const categorySeeder = require('../../seeds/20170114214453-category')

chai.use(chaiHttp)

describe('routes : categories', () => {
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
      () => categorySeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  after('after', () => {
    server.httpServer.close()
  })

  describe('GET /api/categories', () => {
    it('should respond with all categories', (done) => {
      chai.request(server.app)
        .get('/api/categories')
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.categories.length.should.eql(1)
          res.body.categories[0].should.include.keys(
            'id',
            'name',
            'description',
            'createdAt',
            'updatedAt',
            'userId'
          )
        done()
      })
    })
  })
})
