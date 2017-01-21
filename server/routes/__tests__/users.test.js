const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const mockery = require('mockery')
const helpers = require('./helpers')
const models = require('../../models')

chai.use(chaiHttp)

describe('routes : users',  () => {
  let server
  before('before', () => {
    function messages() {
      return {
        send: (data, cb) => {
          const error = null
          const body = {}
          return cb(error, body)
        }
      }
    }

    function MailgunMock(options = {}) {
      return {
        messages: messages
      }
    }

    mockery.registerMock('mailgun-js', MailgunMock)

    mockery.enable({
      useCleanCache:      true,
      warnOnUnregistered: false
    })

    server = require('../..')
  })

  beforeEach('before', () => {
    return helpers.all([
      () => models.sequelize.authenticate(),
      () => helpers.umzug.down({ to: 0 }),
      () => helpers.umzug.up(),
    ])
  })

  afterEach('after', () => {
    return helpers.umzug.down({ to: 0 })
  })

  after('after', () => {
    mockery.disable()
    mockery.deregisterMock('mailgun-js')

    server.httpServer.close()
  })

  describe('POST /api/users', () => {
    it('should create user and send verification email', (done) => {
      chai.request(server.app)
        .post('/api/users')
        .send({
          email: 'admin-create@mail.com',
          username: 'admin_create',
          password: 'qwerty'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          res.body.should.include.keys(
            'id',
            'email',
            'username',
            'password',
            'avatar',
            'createdAt',
            'updatedAt'
          )
          res.body.username.should.equal('admin_create')
          done()
        })
    })
  })
})
