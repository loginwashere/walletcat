const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')

router.get('/', (req, res) => {
  models.transaction
    .findAll({
      where: {
        userId: req.user.sub
      }
    })
    .then(transactions => res.json({transactions}))
})

router.post('/', (req, res) => {
  models.transaction.create({
    id: v4(),
    fromAccountId: req.body.fromAccountId,
    toAccountId: req.body.toAccountId,
    fromRate: req.body.fromRate,
    toRate: req.body.toRate,
    fromAmount: req.body.fromAmount,
    toAmount: req.body.toAmount,
    description: req.body.description,
    categoryId: req.body.categoryId,
    date: req.body.date,
    createdAt: format(new Date()),
    updatedAt: format(new Date())
  })
  .then(res.json.bind(res))
})

router.put('/:id', (req, res) => {
  models.transaction
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(transaction => {
      if (!transaction) {
        return res.status(404).json({
          error: 'Transaction not found'
        })
      }
      return transaction.update({
        fromAccountId: req.body.fromAccountId,
        toAccountId: req.body.toAccountId,
        fromRate: req.body.fromRate,
        toRate: req.body.toRate,
        fromAmount: req.body.fromAmount,
        toAmount: req.body.toAmount,
        description: req.body.description,
        categoryId: req.body.categoryId,
        date: req.body.date
      })
      .then(transaction => transaction
        ? res.json(transaction)
        : res.status(404).json({
          error: 'Transaction not updated'
        })
      )
    })
})

router.delete('/:id', (req, res) => {
  models.transaction
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(transaction => {
      if (transaction) {
        models.transaction
          .destroy({
            where: { id: transaction.id }
          })
          .then(result => res.status(204).json())
      } else {
        res
          .status(404)
          .json({
            error: 'Transaction not found'
          })
      }
    })
})

module.exports = router
