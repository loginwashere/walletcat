const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const NotFoundError = require('../errors/not-found')
const validate = require('../middleware/validate')
const agentSchema = require('../../common/validation').agentSchema
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
    models.agent
      .findAll(Object.assign({}, defaultQuery, {
        where: Object.assign({}, defaultQuery.where, { [req.query.filterName]: condition })
      }))
      .then(items => res.json({ [models.agent.getTableName()]: items }))
      .catch(next)
  } else {
    pagination
      .paginate(models.agent, req.query, defaultQuery)
      .then(res.json.bind(res))
      .catch(next)
  }
})

router.post('/', validate.body(agentSchema), (req, res, next) => {
  models.agent
    .findOne({
      where: {
        userId: req.user.sub,
        name: req.body.name,
      },
      paranoid: false
    })
    .then(agent => {
      if (agent) {
        return agent.restore()
      }
      return models.agent.create({
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

router.put('/:id', validate.body(agentSchema), (req, res, next) => {
  models.agent
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(agent => {
      if (!agent) {
        return next(new NotFoundError('Agent not found'))
      }
      return agent
        .update({
          name: req.body.name,
          description: req.body.description,
          updatedAt: format(new Date())
        })
        .then(agent => res.json(agent))
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  models.agent
    .findOne({
      where: {
        $and: [
          { id: req.params.id },
          { userId: req.user.sub }
        ]
      }
    })
    .then(agent => {
      if (!agent) {
        return next(new NotFoundError('Agent not found'))
      }
      return models.agent
        .destroy({
          where: { id: agent.id }
        })
        .then(() => res.status(204).json())
    })
    .catch(next)
})

module.exports = router
