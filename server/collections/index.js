const format = require('date-fns/format');

module.exports = () => {
  let items = [];
  const collection = {
    all: () => Promise.resolve(items),
    filterAll: cb => Promise.resolve(items.filter(cb)),
    allWithoutDeleted: () => collection.filterAll(i => !i.deleted),
    filter: cb => Promise.resolve(
      items
        .filter(i => typeof i.deleted === 'undefined')
        .filter(cb)
    ),
    find: id => collection.filter(u => u.id === id),
    filterOne: cb => collection
      .filter(cb)
      .then(items => Promise.resolve(items[0])),
    findOne: id => collection
      .find(id)
      .then(items => Promise.resolve(items[0])),
    add: (item) => {
      items = [
        ...items,
        item
      ];
      return Promise.resolve(item);
    },
    addUnique: (item, cb) => collection.filterAll(cb)
      .then(foundItem => {
        if (!foundItem.length) {
          return collection.add(item);
        }
        if (typeof foundItem[0].deleted === 'undefined') {
          return foundItem[0];
        }
        const newItem = Object.assign({}, item, { id: foundItem[0].id});
        items = [
          ...items.slice(0, items.indexOf(foundItem[0])),
          ...[newItem],
          ...items.slice(items.indexOf(foundItem[0]) + 1)
        ];
        return newItem;
      }),
    filterUpdate: (cb, params) => collection.filterOne(cb)
      .then(item => {
        if (!item) {
          return item;
        }
        const updatedItem = Object.assign({}, item, params);
        items[items.indexOf(item)] = updatedItem;
        return updatedItem;
      }),
    update: (id, params) => collection.filterUpdate(u => u.id === id, params),
    delete: id => {
      items = items.filter(i => i.id !== id);
      return Promise.resolve();
    },
    softDelete: id => collection.update(id, { deleted: format(new Date()) }),
    clean: () => {
      items = [];
      return Promise.resolve(items);
    }
  }
  return collection;
};
