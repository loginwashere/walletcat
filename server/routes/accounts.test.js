const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const usersCollection = require('../collections/users');
const generateToken = require('../utils').generateToken;
const applySeeds = require('../seeds');

chai.use(chaiHttp);

const server = require('..');

describe('routes : accounts', () => {
  let token;
  beforeEach('get token', function() {
    return Promise.all([
      usersCollection.filterOne(u => u.username === 'admin')
        .then(user => {
          token = generateToken(user.id);
        }),
      applySeeds()
    ]);
  });

  describe('GET /api/accounts', () => {
    it('should respond with all accounts', (done) => {
      chai.request(server)
      .get('/api/accounts')
      .set('Authorization', `Bearer ${token.value}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.accounts.length.should.eql(2);
        res.body.accounts[0].should.include.keys(
          'id',
          'name',
          'description',
          'created',
          'updated',
          'currencyId',
          'userId',
          'amount'
        );
        done();
      });
    });
  });
});
