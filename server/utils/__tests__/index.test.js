const v4 = require('uuid/v4')
const jwtDecode = require('jwt-decode')
const generateAvatarUrl = require('../').generateAvatarUrl
const generateToken = require('../').generateToken

describe('utils', () => {
  describe('generateAvatarUrl', () => {
    it('should return valid gravatar for email', () => {
      const avatarUrl = generateAvatarUrl('admin@mail.com')
      avatarUrl.should.be.a('string')
      avatarUrl.should.equal('https://www.gravatar.com/avatar/edb0e96701c209ab4b50211c856c50c4?s=50')
    })
    it('should return valid gravatar for another email', () => {
      const avatarUrl = generateAvatarUrl('admin1@mail.com')
      avatarUrl.should.be.a('string')
      avatarUrl.should.equal('https://www.gravatar.com/avatar/d41ac325f62a549d83ff0f2c3128c660?s=50')
    })
  })

  describe('generateToken', () => {
    it('should return valid token when pass only id', () => {
      const id = v4()
      const token = generateToken(id)

      token.should.be.a('object')
      token.should.include.keys(
        'id',
        'value'
      )
      token.id.should.be.a('string')
      token.id.should.equal(id)
      token.value.should.be.a('string')

      const decodedToken = jwtDecode(token.value)
      decodedToken.should.be.a('object')
      decodedToken.should.include.keys(
        'sub',
        'exp'
      )
      decodedToken.sub.should.equal(id)
    })

    it('should return valid token when pass id and expire', () => {
      const id = v4()
      const expire = '2h'
      const token = generateToken(id, expire)

      token.should.be.a('object')
      token.should.include.keys(
        'id',
        'value'
      )
      token.id.should.be.a('string')
      token.id.should.equal(id)
      token.value.should.be.a('string')

      const decodedToken = jwtDecode(token.value)
      decodedToken.should.be.a('object')
      decodedToken.should.include.keys(
        'sub',
        'exp'
      )
      decodedToken.sub.should.equal(id)
    })
  })
})
