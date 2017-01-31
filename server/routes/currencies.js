const express = require('express')
const router = express.Router()
const models = require('../models')
const validate = require('../middleware/validate')
const paginationSchema = require('../../common/validation').paginationSchema
const pagination = require('../utils/pagination')

router.get('/', validate.query(paginationSchema), (req, res, next) => {
  if (req.query.ids) {
    models.currency
      .findAll({
        where: {
          id: req.query.ids
        }
      })
      .then(items => res.json({ [models.currency.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.currency, req.query)
      .then(res.json.bind(res))
      .catch(next)
  }
})

module.exports = router
