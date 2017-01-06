module.exports = () => {
  let items = [];
  const collection = {
    all: () => Promise.resolve(items),
    find: id => Promise.resolve(items.filter(u => u.id === id)),
    filter: cb => Promise.resolve(items.filter(cb)),
    filterOne: cb => collection
      .filter(cb)
      .then(items => Promise.resolve(items[0])),
    findOne: id => collection
      .find(id)
      .then(items => Promise.resolve(items[0])),
    add: item => {
      items = [
        ...items,
        item
      ];
      return Promise.resolve(item);
    },
    delete: id => {
      items = items.filter(i => i.id !== id);
      return Promise.resolve();
    },
    clean: () => {
      items = [];
      return Promise.resolve(items);
    }
  }
  return collection;
};
