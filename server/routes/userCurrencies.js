const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const NotFoundError = require('../errors/not-found')

router.get('/', (req, res, next) => {
  models.userCurrency
    .findAll({
      where: {
        userId: req.user.sub
      }
    })
    .then(userCurrencies => res.json({ userCurrencies }))
    .catch(next)
})

router.post('/', (req, res, next) => {
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
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
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
      if (!userCurrency) {
        return next(new NotFoundError('User currency not found'))
      }
      models.userCurrency
        .destroy({
          where: { id: userCurrency.id }
        })
        .then(() => res.status(204).json())
    })
    .catch(next)
})

module.exports = router
