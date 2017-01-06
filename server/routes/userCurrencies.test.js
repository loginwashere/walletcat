const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const usersCollection = require('../collections/users');
const generateToken = require('../utils').generateToken;
const applySeeds = require('../seeds');

chai.use(chaiHttp);

const server = require('..');

describe('routes : userCurrencies', () => {
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

  describe('GET /api/user-currencies', () => {
    it('should respond with all userCurrencies', (done) => {
      chai.request(server)
      .get('/api/user-currencies')
      .set('Authorization', `Bearer ${token.value}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.userCurrencies.length.should.eql(1);
        res.body.userCurrencies[0].should.include.keys(
          'id',
          'userId',
          'currencyId',
          'created',
          'updated'
        );
        done();
      });
    });
  });
});
