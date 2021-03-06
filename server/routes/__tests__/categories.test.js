const v4 = require('uuid/v4')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const models = require('../../models')
const helpers = require('./helpers')
const userSeeder = require('../../seeds').userSeeder
const categorySeeder = require('../../seeds').categorySeeder
const NotFoundError = require('../../errors/not-found')

chai.use(chaiHttp)

describe('routes : categories', () => {
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
      () => categorySeeder.up(models.sequelize.getQueryInterface(), models.Sequelize),
      () => helpers.getTokenByUsername('admin').then(t => token = t),
    ])
  })

  afterEach('get token', function() {
    return helpers.umzug.down({ to: 0 })
  })

  describe('GET /api/categories', () => {
    it('should respond with all categories', (done) => {
      chai.request(server)
        .get('/api/categories')
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.categories.length.should.eql(2)
          Object.keys(res.body.categories[0]).sort().should.eql([
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

  describe('POST /api/categories', () => {
    it('should create category if valid data sent', (done) => {
      chai.request(server)
        .post('/api/categories')
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          name: 'Transport',
          description: 'All kinds of transport'
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

  describe('PUT /api/categories/:categoryId', () => {
    it('should update category if valid data sent', (done) => {
      const categoryId = categorySeeder.items[0].id
      const newName = `${categorySeeder.items[0].name} ${categorySeeder.items[0].name}`
      const newDescription = newName
      chai.request(server)
        .put(`/api/categories/${categoryId}`)
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
          res.body.id.should.equal(categoryId)
          res.body.name.should.equal(newName)
          res.body.description.should.equal(newDescription)
          done()
        })
    })

    it('should return not found error when update category which is not exist', (done) => {
      const notExistingCategoryId = v4()
      const newName = `${categorySeeder.items[0].name} ${categorySeeder.items[0].name}`
      const newDescription = newName
      chai.request(server)
        .put(`/api/categories/${notExistingCategoryId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .send({
          name: newName,
          description: newDescription
        })
        .end((err, res) => {
          should.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.should.eql(new NotFoundError('Category not found'))
          done()
        })
    })
  })

  describe('DELETE /api/categories/:categoryId', () => {
    it('should delete category if valid data sent', (done) => {
      const categoryId = categorySeeder.items[0].id
      chai.request(server)
        .delete(`/api/categories/${categoryId}`)
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

    it('should return not found error when delete category which is not exist', (done) => {
      const notExistingCategoryId = v4()
      chai.request(server)
        .delete(`/api/categories/${notExistingCategoryId}`)
        .set('Authorization', `Bearer ${token.value}`)
        .end((err, res) => {
          should.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.should.eql(new NotFoundError('Category not found'))
          done()
        })
    })
  })
})
