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
  const defaultQuery = {
    where: {
      userId: req.user.sub
    },
    order: [
      ['date', 'DESC'],
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: models.transactionItem
      }
    ]
  }
  if (req.query.filterName && req.query.filterValue) {
    const condition = Array.isArray(req.query.filterValue)
      ? { $in: req.query.filterValue }
      : { $iLike: `%${req.query.filterValue}%` }
    models.transaction
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, { [req.query.filterName]: condition })
      }))
      .then(items => res.json({ [models.transaction.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.transaction, req.query, defaultQuery)
      .then(res.json.bind(res))
      .catch(next)
  }
})

router.post('/', validate.body(transactionSchema), (req, res, next) => {
  models.transaction
    .create({
      id: v4(),
      userId: req.user.sub,
      transactionItems: req.body.transactionItems.map(transactionItem => Object.assign({}, transactionItem, {
        id: v4(),
        createdAt: format(new Date()),
        updatedAt: format(new Date())
      })),
      description: req.body.description,
      categoryId: req.body.categoryId,
      date: req.body.date,
      createdAt: format(new Date()),
      updatedAt: format(new Date())
    }, {
      include: [ models.transactionItem ]
    })
    .then(res.json.bind(res))
    .catch(next)
})

router.put('/:id', validate.body(transactionSchema), (req, res, next) => {
  const options = {
    where: {
      $and: [
        { id: req.params.id },
        { userId: req.user.sub }
      ]
    },
    include: [
      {
        model: models.transactionItem
      }
    ]
  }
  models.transaction
    .findOne(options)
    .then(transaction => {
      if (!transaction) {
        return next(new NotFoundError('Transaction not found'))
      }
      return models.sequelize.transaction((t) => {
        const updateOptions = Object.assign({}, options, { transaction: t })
        return transaction
          .update({
            description: req.body.description,
            categoryId: req.body.categoryId,
            date: req.body.date,
            updatedAt: format(new Date())
          }, updateOptions)
          .then(transaction => Promise
            .all(transaction.transactionItems
              .map(transactionItem => {
                if (transactionItem.changed()) {
                  transactionItem.transactionId = transaction.id
                  transactionItem.updatedAt = format(new Date())
                  if (!transactionItem.id) {
                    transactionItem.id = v4()
                    transactionItem.createdAt = format(new Date())
                  }
                  return transactionItem.save(updateOptions)
                }
                return Promise.resolve()
              })
            )
            .then(() => transaction.reload()
              .then(transaction => res.json(transaction))))
      })
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
