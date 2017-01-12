const express = require('express');
const router = express.Router();
const transactionsCollection = require('../collections/transactions');
const createTransaction = require('../models/transaction').create;
const updateTransaction = require('../models/transaction').update;

router.get('/', (req, res) => {
  transactionsCollection
    .filter(transaction => transaction.userId === req.user.sub)
    .then(transactions => res.json({transactions}));
});

router.post('/', (req, res) => {
  transactionsCollection
    .add(createTransaction({
      userId: req.user.sub,
      fromAccountId: req.body.fromAccountId,
      toAccountId: req.body.toAccountId,
      fromRate: req.body.fromRate,
      toRate: req.body.toRate,
      fromAmount: req.body.fromAmount,
      toAmount: req.body.toAmount,
      description: req.body.description,
      categoryId: req.body.categoryId,
      date: req.body.date
    }))
    .then(transaction => res.json(transaction));
});

router.put('/:id', (req, res) => {
  transactionsCollection
    .filterUpdate(
      c => c.userId === req.user.sub && c.id === req.params.id,
      updateTransaction({
        fromAccountId: req.body.fromAccountId,
        toAccountId: req.body.toAccountId,
        fromRate: req.body.fromRate,
        toRate: req.body.toRate,
        fromAmount: req.body.fromAmount,
        toAmount: req.body.toAmount,
        description: req.body.description,
        categoryId: req.body.categoryId,
        date: req.body.date
      })
    )
    .then(transaction => transaction ? res.json(transaction) : res.status(404).json({
      error: 'Transaction not found'
    }));
});

router.delete('/:id', (req, res) => {
  transactionsCollection
    .filterOne(c => c.userId === req.user.sub && c.id === req.params.id)
    .then(transaction => {
      if (!transaction) {
        return res.status(404).json({
          error: 'Transaction not found'
        });
      }
      transactionsCollection.delete(transaction.id)
        .then(result => res.status(204).json());

    });
});

module.exports = router;
