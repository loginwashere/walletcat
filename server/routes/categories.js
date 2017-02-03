const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const NotFoundError = require('../errors/not-found')
const validate = require('../middleware/validate')
const categorySchema = require('../../common/validation').categorySchema
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
  if (req.query.filterName && req.query.filterValue) {
    const condition = Array.isArray(req.query.filterValue)
      ? { $in: req.query.filterValue }
      : { $iLike: `%${req.query.filterValue}%` }
    models.category
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, { [req.query.filterName]: condition })
      }))
      .then(items => res.json({ [models.category.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.category, req.query, defaultQuery)
      .then(res.json.bind(res))
      .catch(next)
  }
})

router.post('/', validate.body(categorySchema), (req, res, next) => {
  models.category
    .findOne({
      where: {
        userId: req.user.sub,
        name: req.body.name,
      },
      paranoid: false
    })
    .then(category => {
      if (category) {
        return category.restore()
      }
      return models.category.create({
        id: v4(),
        userId: req.user.sub,
        name: req.body.name,
        description: req.body.description,
        createdAt: format(new Date()),
        updatedAt: format(new Date())
      })
    })
    .then(res.json.bind(res))
    .catch(next)
})

router.put('/:id', validate.body(categorySchema), (req, res, next) => {
  models.category
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(category => {
      if (!category) {
        return next(new NotFoundError('Category not found'))
      }
      return category
        .update({
          name: req.body.name,
          description: req.body.description,
          updatedAt: format(new Date())
        })
        .then(category => res.json(category))
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  models.category
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(category => {
      if (!category) {
        return next(new NotFoundError('Category not found'))
      }
      return models.category
        .destroy({
          where: { id: category.id }
        })
        .then(() => res.status(204).json())
    })
    .catch(next)
})

module.exports = router
