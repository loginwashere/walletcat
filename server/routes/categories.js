const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')

router.get('/', (req, res) => {
  models.category
    .findAll({
      where: {
        userId: req.user.sub
      }
    })
    .then(categories => res.json({categories}))
})

router.post('/', (req, res) => {
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
})

router.put('/:id', (req, res) => {
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
        return res.status(404).json({
          error: 'Category not found'
        })
      }
      return category.update({
        name: req.body.name,
        description: req.body.description,
      })
      .then(category => category
        ? res.json(category)
        : res.status(404).json({
          error: 'Category not updated'
        })
      )
    })
})

router.delete('/:id', (req, res) => {
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
      if (category) {
        models.category
          .destroy({
            where: { id: category.id }
          })
          .then(result => res.status(204).json())
      } else {
        res
          .status(404)
          .json()
      }
    })
})

module.exports = router
