const express = require('express');
const router = express.Router();
const transactionsCollection = require('../collections/transactions');

router.get('/', (req, res) => {
  transactionsCollection
    .filter(transaction => transaction.userId === req.user.sub)
    .then(transactions => res.json({transactions}));
});

router.post('/', (req, res) => {
  const account = {
    userId: req.user.sub,
    fromAccountId: req.body.fromAccountId,
    toAccountId: req.body.toAccountId,
    rate: req.body.rate,
    name: req.body.name,
    description: req.body.description,
    fromAmount: req.body.fromAmount,
    toAmount: req.body.toAmount,
    categoryId: req.body.categoryId,
    date: req.body.date
  };
  transactionsCollection
    .add(account)
    .then(res.json);
});

router.delete('/:id', (req, res) => {
  transactionsCollection
    .filterOne(t => t.userId === req.user.sub && t.id === req.params.id)
    .then(t => {
      if (t) {
        return transactionsCollection.delete(req.params.id)
      }
      return Promise.resolve();
    })
    .then(result => {
      return res
        .status(204)
        .json();
    });
});

module.exports = router;
