const path = require('path')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const userSeeder = require('../../seeds/20170114212746-user')
const helpers = require('./helpers')
const ServerError = require('../../errors/server-error')
const UnauthorizedError = require('express-jwt/lib/errors/UnauthorizedError')

chai.use(chaiHttp)

describe('routes : auth', () => {
  let server

  before('before', () => {
    server = require('../..')
  })

  beforeEach('get token', function() {
    return helpers.all([
      () => models.sequelize.authenticate(),
      () => helpers.umzug.down({ to: 0 }),
      () => helpers.umzug.up(),
      () => userSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize)
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  after('after', (done) => {
    server.httpServer.close(done)
  })

  describe('POST /api/auth', () => {
    it('should respond with validation errors to request with invalid data', (done) => {
      chai.request(server.app)
        .post('/api/auth')
        .send({
          login: 'invalid-email',
          password: 'qwe'
        })
        .end((err, res) => {
          err.response.status.should.equal(400)
          err.response.type.should.equal('application/json')
          err.response.body.should.be.a('object')
          Object.keys(err.response.body).sort().should.eql([
            'name',
            'errors',
            'status'
          ].sort())
          err.response.body.errors.should.be.a('object')
          Object.keys(err.response.body.errors).sort().should.eql([
            'login',
            'password'
          ].sort())
          done()
      })
    })

    it('should respond with error if credentils do not match', (done) => {
      chai.request(server.app)
        .post('/api/auth')
        .send({
          login: 'admin@mail.com',
          password: 'invalid-password'
        })
        .end((err, res) => {
          err.response.status.should.equal(403)
          err.response.type.should.equal('application/json')
          err.response.body.should.be.a('object')
          Object.keys(res.body).sort().should.eql([
            'name',
            'message',
            'status'
          ].sort())
          err.response.body.message.should.equal('Credentials do not match')
          done()
      })
    })

    it('should respond user and token if all ok', (done) => {
      chai.request(server.app)
        .post('/api/auth')
        .send({
          login: userSeeder.items[0].email,
          password: userSeeder.DEFAULT_PASSWORD
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          Object.keys(res.body).sort().should.eql([
            'token',
            'user'
          ].sort())
          res.body.token.should.be.a('string')
          res.body.user.should.be.a('object')
          Object.keys(res.body.user).sort().should.eql([
            'id',
            'username',
            'email',
            'emailConfirmed',
            'avatar',
            'createdAt',
            'updatedAt'
          ].sort())
          res.body.user.email.should.equal(userSeeder.items[0].email)
          done()
      })
    })
  })

  describe('DELETE /api/auth', () => {
    it('should respond with auth error when try to logout without token', (done) => {
      chai.request(server.app)
        .delete('/api/auth')
        .end((err, res) => {
          console.log(err.response.body)
          err.response.status.should.equal(401)
          err.response.type.should.equal('application/json')
          err.response.body.should.eql(
            new ServerError(new UnauthorizedError(null, new Error('No authorization token was found')))
          )
          done()
      })
    })
  })
})
