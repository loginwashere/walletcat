const generateAvatarUrl = require('../').generateAvatarUrl

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
})
