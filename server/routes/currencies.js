const express = require('express');
const router = express.Router();
const currenciesCollection = require('../collections/currencies');

router.get('/', (req, res) => {
  currenciesCollection.all()
    .then(currencies => res.json({currencies}));
});

module.exports = router;