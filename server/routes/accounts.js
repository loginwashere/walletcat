const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const NotFoundError = require('../errors/not-found')
const validate = require('../middleware/validate')
const accountSchema = require('../../common/validation').accountSchema
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
    models.account
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, {
          id: req.query.ids
        })
      }))
      .then(items => res.json({ [models.account.getTableName()]: items }))
      .catch(next)
  } else if (req.query.filterName && req.query.filterValue) {
    const condition = Array.isArray(req.query.filterValue)
      ? { $in: req.query.filterValue }
      : { $iLike: `%${req.query.filterValue}%` }
    models.account
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, { [req.query.filterName]: condition })
      }))
      .then(items => res.json({ [models.account.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.account, req.query, defaultQuery)
      .then(res.json.bind(res))
      .catch(next)
  }
})

router.post('/', validate.body(accountSchema), (req, res, next) => {
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
      return models.account
        .create({
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
    .catch(next)
})

router.put('/:id', validate.body(accountSchema), (req, res, next) => {
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
        return next(new NotFoundError('Account not found'))
      }
      return account
        .update({
          name: req.body.name,
          description: req.body.description,
          amount: req.body.amount,
          currencyId: req.body.currencyId,
          updatedAt: format(new Date())
        })
        .then(account => res.json(account))
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
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
        return next(new NotFoundError('Account not found'))
      }
      return models.account
        .destroy({
          where: { id: account.id }
        })
        .then(() => res.status(204).json())
    })
    .catch(next)
})

module.exports = router
