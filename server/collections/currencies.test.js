const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

describe('collection', () => {
  let currencies1, currencies2;

  beforeEach('create collection', function() {
    currencies1 = require('./currencies');
    currencies2 = require('./currencies');
    return Promise.all([
      currencies1.clean(),
      currencies2.clean()
    ]);
  });

  afterEach('clean collection', function() {
    return Promise.all([
      currencies1.clean(),
      currencies2.clean()
    ]);
  })


  describe('get all items from collection with item', () => {
    it('should return empty array without items', function() {
      return currencies1
        .add({id: 1, value: 1})
        .then(item => currencies2.all().should.eventually.have.length(1));
    });
  });
});
