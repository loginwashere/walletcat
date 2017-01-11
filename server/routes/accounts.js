const express = require('express');
const router = express.Router();
const accountsCollection = require('../collections/accounts');
const createAccount = require('../models/account').create;
const updateAccount = require('../models/account').update;

router.get('/', (req, res) => {
  accountsCollection
    .filter(a => a.userId === req.user.sub)
    .then(accounts => res.json({accounts}));
});

router.post('/', (req, res) => {
  return accountsCollection
    .add(createAccount({
      userId: req.user.sub,
      name: req.body.name,
      description: req.body.description,
      currencyId: req.body.currencyId,
      amount: req.body.amount
    }))
    .then(account => res.json(account));
});

router.put('/:id', (req, res) => {
  accountsCollection
    .filterUpdate(
      c => c.userId === req.user.sub && c.id === req.params.id,
      updateAccount({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        currencyId: req.body.currencyId
      })
    )
    .then(account => account ? res.json(account) : res.status(404).json({
      error: 'Account not found'
    }));
});

router.delete('/:id', (req, res) => {
  accountsCollection
    .filterOne(c => c.userId === req.user.sub && c.id === req.params.id)
    .then(account => {
      if (!account) {
        return res.status(404).json({
          error: 'Account not found'
        });
      }
      accountsCollection.delete(account.id)
        .then(result => res.status(204).json());

    });
});


module.exports = router;