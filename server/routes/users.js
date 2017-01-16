const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const Joi = require('joi')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl
const errorMessages = require('../utils').errorMessages
const validation = require('../validation')

router.post('/', (req, res) => {
  const validationErrors = Joi.validate(req.body, validation.registerSchema)
  if (validationErrors.error) {
    return res.status(400).json({ errors:errorMessages(validationErrors) })
  }
  models.user
    .create({
      id: v4(),
      email: req.body.email,
      username: req.body.username,
      avatar: generateAvatarUrl(req.body.email),
      password: hashPassword(req.body.password),
      createdAt: format(new Date()),
      updatedAt: format(new Date()),
    })
    .then(user => res.json(user))
    .catch(error => res.status(500).json({
      error: error.message
    }))
})

module.exports = router
