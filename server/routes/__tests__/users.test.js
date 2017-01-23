const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const mockery = require('mockery')
const helpers = require('./helpers')
const models = require('../../models')
const generateToken = require('../../utils').generateToken
const userSeeder = require('../../seeds/20170114212746-user')
const BadRequestError = require('../../errors/bad-request')
const NotFoundError = require('../../errors/not-found')
const ServerError = require('../../errors/server-error')

chai.use(chaiHttp)

describe('routes : users',  () => {
  let server = {}

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

  describe('POST /api/users', () => {
    before('before', () => {
      function messages() {
        return {
          send: (data) => {
            if (data.to === 'should-reject@mail.com') {
              try {
                throw new Error('test')
              } catch (error) {
                return Promise.reject(error)
              }
            }
            const body = {}
            return Promise.resolve(body)
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

      server.app = require('../../server')()
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
            'emailConfirmed',
            'avatar',
            'createdAt',
            'updatedAt'
          )
          res.body.username.should.equal('admin_create')
          done()
        })
    })

    it('should return error if fail to send email', (done) => {
      chai.request(server.app)
        .post('/api/users')
        .send({
          email: 'should-reject@mail.com',
          username: 'admin_create',
          password: 'qwerty'
        })
        .end((err, res) => {
          err.response.status.should.equal(500)
          err.response.type.should.equal('application/json')
          err.response.body.should.eql(new ServerError(new Error('test')))
          done()
        })
    })
  })

  describe('POST /api/users/email-confirm', () => {
    before('before', () => {
      server.app = require('../../server')()
    })

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
          err.response.body.should.eql(new BadRequestError('Invalid email confirm token'))
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
          err.response.body.should.eql(new NotFoundError('User not found'))
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
          Object.keys(res.body).should.eql([
            'emailConfirmed'
          ])
          res.body.emailConfirmed.should.equal(true)
          done()
        })
    })
  })
})
