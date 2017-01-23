const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const mockery = require('mockery')
const helpers = require('./helpers')
const models = require('../../models')
const generateToken = require('../../utils').generateToken
const userSeeder = require('../../seeds/20170114212746-user')

chai.use(chaiHttp)

describe('routes : users',  () => {
  let server

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
    server.httpServer.close()
  })

  describe('POST /api/users', () => {
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

    after('after', () => {
      mockery.disable()
      mockery.deregisterMock('mailgun-js')
    })

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

  describe('POST /api/users/email-confirm', () => {
    beforeEach('before', () => {
      return helpers.all([
        () => userSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      ])
    })

    it('should return error if email confirm token is invalid', (done) => {
      chai.request(server.app)
        .post('/api/users/email-confirm')
        .send({
          emailConfirm: 'admin-create@mail.com',
        })
        .end((err, res) => {
          err.response.status.should.equal(400)
          err.response.type.should.equal('application/json')
          err.response.body.should.be.a('object')
          err.response.body.should.include.keys(
            'error'
          )
          err.response.body.error.should.equal('Invalid email confirm token')
          done()
        })
    })

    it('should return error if email confirm token is valid but user with email does not exist', (done) => {
      const emailConfirm = generateToken('user-does-not-exist@mail.com').value
      chai.request(server.app)
        .post('/api/users/email-confirm')
        .send({
          emailConfirm: emailConfirm
        })
        .end((err, res) => {
          err.response.status.should.equal(404)
          err.response.type.should.equal('application/json')
          err.response.body.should.be.a('object')
          err.response.body.should.include.keys(
            'error'
          )
          err.response.body.error.should.equal('User not found')
          done()
        })
    })

    it('should return success response if token is valid and user exists', (done) => {
      const emailConfirm = generateToken(userSeeder.items[0].email).value
      chai.request(server.app)
        .post('/api/users/email-confirm')
        .send({
          emailConfirm: emailConfirm
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          res.body.should.include.keys(
            'emailConfirmed'
          )
          res.body.emailConfirmed.should.equal(true)
          done()
        })
    })
  })
})
