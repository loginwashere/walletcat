const express = require('express')
const router = express.Router()
const models = require('../models')
const validate = require('../middleware/validate')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const NotFoundError = require('../errors/not-found')
const paginationSchema = require('../../common/validation').paginationSchema
const pagination = require('../utils/pagination')

router.get('/', validate.query(paginationSchema), (req, res, next) => {
  const defaultQuery = {
    where: {
      userId: req.user.sub
    },
    order: [
      ['createdAt', 'DESC']
    ]
  }
  if (req.query.ids) {
    models.userCurrency
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, {
          id: req.query.ids
        })
      }))
      .then(items => res.json({ [models.userCurrency.getTableName()]: items }))
      .catch(next)
  } else if (req.query.filterName && req.query.filterValue) {
    models.userCurrency
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, {
          [req.query.filterName]: {
            $in: req.query.filterValue
          }
        })
      }))
      .then(items => res.json({ [models.userCurrency.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.userCurrency, req.query, defaultQuery)
      .then(res.json.bind(res))
      .catch(next)
  }
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
