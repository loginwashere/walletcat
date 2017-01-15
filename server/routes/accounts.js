const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')

router.get('/', (req, res) => {
  models.account
    .findAll({
      where: {
        userId: req.user.sub
      }
    })
    .then(accounts => res.json({accounts}))
})

router.post('/', (req, res) => {
  models.account
    .findOne({
      where: {
        userId: req.user.sub,
        name: req.body.name,
      },
      paranoid: false
    })
    .then(account => {
      if (account) {
        return account.restore()
      }
      return models.account.create({
        id: v4(),
        userId: req.user.sub,
        name: req.body.name,
        currencyId: req.body.currencyId,
        description: req.body.description,
        createdAt: format(new Date()),
        updatedAt: format(new Date())
      })
    })
    .then(res.json.bind(res))
})

router.put('/:id', (req, res) => {
  models.account
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(account => {
      if (!account) {
        return res.status(404).json({
          error: 'Account not found'
        })
      }
      return account.update({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        currencyId: req.body.currencyId
      })
      .then(account => account
        ? res.json(account)
        : res.status(404).json({
          error: 'Account not updated'
        })
      )
    })
})

router.delete('/:id', (req, res) => {
  models.account
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(account => {
      if (account) {
        models.account
          .destroy({
            where: { id: account.id }
          })
          .then(result => res.status(204).json())
      } else {
        res
          .status(404)
          .json({
            error: 'Account not found'
          })
      }
    })
})

module.exports = router
