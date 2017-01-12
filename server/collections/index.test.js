const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const prepareCollection = require('.');

chai.use(chaiAsPromised);
chai.should();

describe('collection', () => {
  let collection;

  beforeEach('create collection', function() {
    collection = prepareCollection();
  });

  afterEach('clean collection', function() {
    collection.clean();
  })

  describe('get all items from empty collection', () => {
    it('should return empty array without items', function() {
      return collection.all().should.eventually.have.length(0);
    });
  });

  describe('get all items from collection with item', () => {
    it('should return not empty array with one item', function() {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection.all().should.eventually.have.length(1));
    });
  });

  describe('find item in empty collection', () => {
    it('should return empty array without items', function() {
      return collection.find(1).should.eventually.have.length(0);
    });
  });

  describe('find item in collection with item', () => {
    it('should return not empty array with one item', function() {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection.find(1).should.eventually.have.length(1));
    });
  });

  describe('find one item in empty collection', () => {
    it('should return empty array without items', function() {
      return collection.findOne(1).should.eventually.become(undefined);
    });
  });

  describe('find one item in collection with item', () => {
    it('should return empty array without items', () => {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection.findOne(1).should.eventually.become({id: 1, value: 1}));
    });
  });

  describe('delete item from empty collection', () => {
    it('should return empty array without items', function() {
      return collection.delete(1).should.eventually.become(undefined);
    });
  });

  describe('delete item from collection with item', () => {
    it('should return empty array without items', () => {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection.delete(1).should.eventually.become(undefined));
    });
  });

  describe('filter item from empty collection', () => {
    it('should return empty array without items', function() {
      return collection
        .filter(i => i.id === 1)
        .should.eventually.become([]);
    });
  });

  describe('filter item from collection with item', () => {
    it('should return empty array without items', () => {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection
          .filter(i => i.id === 1)
          .should.eventually.become([{id: 1, value: 1}]));
    });
  });

  describe('filter one item from empty collection', () => {
    it('should return empty array without items', function() {
      return collection
        .filterOne(i => i.id === 1)
        .should.eventually.become(undefined);
    });
  });

  describe('filter one item from collection with item', () => {
    it('should return empty array without items', () => {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection
          .filterOne(i => i.id === 1)
          .should.eventually.become({id: 1, value: 1}));
    });
  });

  describe('clean empty collection', () => {
    it('should return empty array without items', function() {
      return collection
        .clean().should.eventually.become([]);
    });
  });

  describe('clean collection with item', () => {
    it('should return empty array without items', () => {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection
          .clean().should.eventually.become([]));
    });
  });

  describe('update empty collection', () => {
    it('should return empty array without items', function() {
      return collection
        .update(1, {value: 2}).should.eventually.become(undefined);
    });
  });

  describe('update collection with item', () => {
    it('should return empty array without items', () => {
      return Promise.all([
        collection.add({id: 3, value: 4}),
        collection.add({id: 2, value: 3}),
        collection.add({id: 1, value: 1})
      ]).then(result => collection
          .update(1, {value: 2}).should.eventually.become({id: 1, value: 2}))
        .then(result => collection
          .findOne(1).should.eventually.become({id: 1, value: 2}));
    });
  });

  describe('filterUpdate empty collection', () => {
    it('should return empty array without items', function() {
      return collection
        .filterUpdate(i => i.id === 1, {value: 2}).should.eventually.become(undefined);
    });
  });

  describe('filterUpdate collection with item', () => {
    it('should return empty array without items', () => {
      return collection
        .add({id: 1, value: 1})
        .then(item => collection
          .filterUpdate(i => i.id === 1, {value: 2}).should.eventually.become({id: 1, value: 2}))
        .then(result => collection
          .findOne(1).should.eventually.become({id: 1, value: 2}));
    });
  });

});
