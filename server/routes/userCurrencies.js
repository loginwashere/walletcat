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
    .then(res.json);
});

router.delete('/:id', (req, res) => {
  const userCurrency = userCurrenciesCollection
    .filter((userCurrency) => userCurrency.userId === req.user.sub)
    .filter((userCurrency) => userCurrency.id === req.params.id)
    [0];
  if (userCurrency) {
    // const index = userCurrencies.indexOf(userCurrency);
    // userCurrencies.splice(index, 1);
  }
  res
    .status(204)
    .json();
});

module.exports = router;
