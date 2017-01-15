const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.currency.findAll()
    .then(currencies => res.json({currencies}))
});

module.exports = router
