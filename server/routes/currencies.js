const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req, res, next) => {
  models.currency.findAll()
    .then(currencies => res.json({currencies}))
    .catch(next)
});

module.exports = router
