const v4 = require('uuid/v4')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const userSeeder = require('../../seeds').userSeeder
const agentSeeder = require('../../seeds').agentSeeder
const NotFoundError = require('../../errors/not-found')

chai.use(chaiHttp)

describe('routes : agents', () => {
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
      () => agentSeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  describe('GET /api/agents', () => {
    it('should respond with all agents', (done) => {
      chai.request(server)
        .get('/api/agents')
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.agents.length.should.eql(2)
          Object.keys(res.body.agents[0]).sort().should.eql([
            'id',
            'name',
            'description',
            'createdAt',
            'updatedAt',
            'userId'
          ].sort())
          done()
        })
    })
  })

  describe('POST /api/agents', () => {
    it('should create agent if valid data sent', (done) => {
      chai.request(server)
        .post('/api/agents')
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          name: 'John Doe',
          description: 'Some agent'
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
            'createdAt',
            'updatedAt',
            'userId'
          ].sort())
          res.body.userId.should.equal(userSeeder.items[0].id)
          done()
        })
    })
  })

  describe('PUT /api/agents/:categoryId', () => {
    it('should update agent if valid data sent', (done) => {
      const agentId = agentSeeder.items[0].id
      const newName = `${agentSeeder.items[0].name} ${agentSeeder.items[0].name}`
      const newDescription = newName
      chai.request(server)
        .put(`/api/agents/${agentId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          name: newName,
          description: newDescription
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
            'createdAt',
            'updatedAt',
            'userId'
          ].sort())
          res.body.userId.should.equal(userSeeder.items[0].id)
          res.body.id.should.equal(agentId)
          res.body.name.should.equal(newName)
          res.body.description.should.equal(newDescription)
          done()
        })
    })

    it('should return not found error when update agent that does not exist', (done) => {
      const notExistingCategoryId = v4()
      const newName = `${agentSeeder.items[0].name} ${agentSeeder.items[0].name}`
      const newDescription = newName
      chai.request(server)
        .put(`/api/agents/${notExistingCategoryId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          name: newName,
          description: newDescription
        })
        .end((err, res) => {
          should.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.should.eql(new NotFoundError('Agent not found'))
          done()
        })
    })
  })

  describe('DELETE /api/agents/:agentId', () => {
    it('should delete agent if valid data sent', (done) => {
      const agentId = agentSeeder.items[0].id
      chai.request(server)
        .delete(`/api/agents/${agentId}`)
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

    it('should return not found error when delete agent that does not exist', (done) => {
      const notExistingAgentId = v4()
      chai.request(server)
        .delete(`/api/agents/${notExistingAgentId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.should.eql(new NotFoundError('Agent not found'))
          done()
        })
    })
  })
})
