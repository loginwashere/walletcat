const express = require('express');
const router = express.Router();
const accountsCollection = require('../collections/accounts');
const createAccount = require('../models/account');

router.get('/', (req, res) => {
  accountsCollection
    .filter(a => a.userId === req.user.sub)
    .then(accounts => res.json({accounts}));
});

router.post('/', (req, res) => {
  const account = createAccount({
    userId: req.user.sub,
    name: req.body.name,
    description: req.body.description,
    currencyId: req.body.currencyId,
    amount: req.body.amount
  });
  return accountsCollection
    .add(account)
    .then(res.json);
});

router.delete('/:id', (req, res) => {
  return accountsCollection
    .filterOne(item => item.userId === req.user.sub && item.id === req.params.id)
    .then(account => {
      if (account) {
        // const index = accounts.indexOf(account);
        // accounts.splice(index, 1);
      }
      res
        .status(204)
        .json();
    });
});

module.exports = router;