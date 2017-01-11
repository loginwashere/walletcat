const express = require('express');
const router = express.Router();
const userCurrenciesCollection = require('../collections/userCurrencies');
const createUserCurrency = require('../models/userCurrency');

router.get('/', (req, res) => {
  userCurrenciesCollection
    .filter(c => c.userId === req.user.sub)
    .then(userCurrencies => res.json({userCurrencies}));
});

router.post('/', (req, res) => {
  const newUserCurrency = createUserCurrency({
    userId: req.user.sub,
    currencyId: req.body.currencyId
  });
  return userCurrenciesCollection.add(newUserCurrency)
    .then(newUserCurrency => res.json(newUserCurrency));
});

router.delete('/:id', (req, res) => {
  userCurrenciesCollection
    .filterOne(c => c.userId === req.user.sub && c.id === req.params.id)
    .then(userCurrency => {
      if (userCurrency) {
        userCurrenciesCollection.delete(userCurrency.id)
          .then(result => res.status(204).json());
      } else {
        res
        .status(404)
        .json();
      }
    });
});

module.exports = router;
