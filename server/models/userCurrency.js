const v4 = require('uuid/v4');
const format = require('date-fns/format');

module.exports.create = params => Object.assign({}, params, {
  id: v4(),
  created: format(new Date()),
  updated: format(new Date())
});

module.exports.createUniqueRule = (userId, currencyId) => i =>
  i.userId === userId && i.currencyId === currencyId;