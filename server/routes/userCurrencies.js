const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')

router.get('/', (req, res) => {
  models.userCurrency
    .findAll({
      where: {
        userId: req.user.sub
      }
    })
    .then(userCurrencies => res.json({userCurrencies}))
})

router.post('/', (req, res) => {
  models.userCurrency
    .findOne({
      where: {
        userId: req.user.sub,
        currencyId: req.body.currencyId,
      },
      paranoid: false
    })
    .then(userCurrency => {
      if (userCurrency) {
        return userCurrency.restore()
      }
      return models.userCurrency.create({
        id: v4(),
        userId: req.user.sub,
        currencyId: req.body.currencyId,
        createdAt: format(new Date()),
        updatedAt: format(new Date()),
      })
    })
    .then(res.json.bind(res))
})

router.delete('/:id', (req, res) => {
  models.userCurrency
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(userCurrency => {
      if (userCurrency) {
        models.userCurrency
          .destroy({
            where: { id: userCurrency.id }
          })
          .then(result => res.status(204).json())
      } else {
        res
          .status(404)
          .json()
      }
    })
})

module.exports = router
