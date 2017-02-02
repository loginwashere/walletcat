const express = require('express')
const router = express.Router()
const models = require('../models')
const validate = require('../middleware/validate')
const paginationSchema = require('../../common/validation').paginationSchema
const pagination = require('../utils/pagination')

router.get('/', validate.query(paginationSchema), (req, res, next) => {
  const defaultQuery = {
    where: {},
    order: [
      ['createdAt', 'ASC']
    ]
  }
  if (req.query.ids) {
    models.currency
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, {
          id: req.query.ids
        })
      }))
      .then(items => res.json({ [models.currency.getTableName()]: items }))
      .catch(next)
  } else if (req.query.filterName && req.query.filterValue) {
    const condition = Array.isArray(req.query.filterValue)
      ? { $in: req.query.filterValue }
      : { $iLike: `%${req.query.filterValue}%` }
    models.currency
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, { [req.query.filterName]: condition })
      }))
      .then(items => res.json({ [models.currency.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.currency, req.query, defaultQuery)
      .then(res.json.bind(res))
      .catch(next)
  }
})

module.exports = router
