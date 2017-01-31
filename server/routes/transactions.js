const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const NotFoundError = require('../errors/not-found')
const validate = require('../middleware/validate')
const transactionSchema = require('../../common/validation').transactionSchema
const paginationSchema = require('../../common/validation').paginationSchema
const pagination = require('../utils/pagination')

router.get('/', validate.query(paginationSchema), (req, res, next) => {
  if (req.query.ids) {
    models.transaction
      .findAll({
        where: {
          userId: req.user.sub,
          id: req.query.ids
        }
      })
      .then(items => res.json({ [models.transaction.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.transaction, req.query, {
        where: {
          userId: req.user.sub
        }
      })
      .then(res.json.bind(res))
      .catch(next)
  }
})

router.post('/', validate.body(transactionSchema), (req, res, next) => {
  models.transaction
    .create({
      id: v4(),
      userId: req.user.sub,
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
    .catch(next)
})

router.put('/:id', validate.body(transactionSchema), (req, res, next) => {
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
        return next(new NotFoundError('Transaction not found'))
      }
      return transaction
        .update({
          fromAccountId: req.body.fromAccountId,
          toAccountId: req.body.toAccountId,
          fromRate: req.body.fromRate,
          toRate: req.body.toRate,
          fromAmount: req.body.fromAmount,
          toAmount: req.body.toAmount,
          description: req.body.description,
          categoryId: req.body.categoryId,
          date: req.body.date,
          updatedAt: format(new Date())
        })
        .then(transaction => res.json(transaction))
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
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
        return next(new NotFoundError('Transaction not found'))
      }
      return models.transaction
        .destroy({
          where: { id: transaction.id }
        })
        .then(() => res.status(204).json())
    })
    .catch(next)
})

module.exports = router
