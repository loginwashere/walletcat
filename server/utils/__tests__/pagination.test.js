const pagination = require('../pagination')

describe('utils : pagination', () => {
  describe('getPaginationParams', () => {
    it('should return default pagination params', () => {
      const query = {}
      const params = pagination.getPaginationParams(query)
      params.should.be.a('object')
      Object.keys(params).sort().should.eql([
        'limit',
        'page'
      ].sort())
      params.limit.should.equal(pagination.DEFAULT_LIMIT)
      params.page.should.equal(pagination.DEFAULT_PAGE)
    })

    it('should return pagination params if set', () => {
      const query = {
        limit: 11,
        page: 3
      }
      const params = pagination.getPaginationParams(query)
      params.should.be.a('object')
      Object.keys(params).sort().should.eql([
        'limit',
        'page'
      ].sort())
      params.limit.should.equal(query.limit)
      params.page.should.equal(query.page)
    })
  })
})