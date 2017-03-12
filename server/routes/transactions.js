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
const debug = require('debug')('routes:transactions')

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
        const transactionItemsDataByItemId = req.body.transactionItems
          .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {})
        const transactionItemsByItemId = transaction.transactionItems
          .reduce((obj, item) => Object.assign({}, obj, { [item.id]: item }), {})
        return transaction
          .update({
            description: req.body.description,
            categoryId: req.body.categoryId,
            date: req.body.date,
            updatedAt: format(new Date())
          }, updateOptions)
          .then(transaction => Promise
            .all(req.body.transactionItems
              .map(transactionItemData => {
                const transactionItem = transactionItemsByItemId[transactionItemData.id]
                debug(transactionItemData, transactionItem)
                if (transactionItem) {
                  transactionItem.transactionId = transaction.id
                  transactionItem.accountId = transactionItemData.accountId
                  transactionItem.amount = transactionItemData.amount
                  transactionItem.rate = transactionItemData.rate
                  transactionItem.type = transactionItemData.type
                  transactionItem.updatedAt = format(new Date())
                  if (!transactionItem.id) {
                    transactionItem.id = v4()
                    transactionItem.createdAt = format(new Date())
                  }
                  return transactionItem.save(updateOptions)
                } else {
                  return models.transactionItem.create(
                    Object.assign({}, transactionItemData, {
                      id: v4(),
                      transactionId: transaction.id,
                      createdAt: format(new Date()),
                      updatedAt: format(new Date())
                    }),
                    {
                      transaction: updateOptions.transaction
                    }
                  )
                }
              })
              .concat(transaction.transactionItems
                .map(transactionItem => {
                  const transactionItemData = transactionItemsDataByItemId[transactionItem.id]
                  if (!transactionItemData) {
                    return models.transactionItem.destroy({
                      where: {
                        $and: [
                          { id: transactionItem.id },
                          { transactionId: transaction.id }
                        ]
                      },
                      transaction: updateOptions.transaction
                    })
                  }
                })
              )
            )
          )
          .then(() => transaction.reload()
            .then(transaction => res.json(transaction)))
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
