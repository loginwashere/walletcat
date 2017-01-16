const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const config = require('../config')
const models = require('../models')
const hashPassword = require('../utils').hashPassword
const generateToken = require('../utils').generateToken
const errorMessages = require('../utils').errorMessages
const validation = require('../validation');

router.post('/', (req, res) => {
  const validationErrors = errorMessages(Joi.validate(req.body, validation.loginSchema));

  return models.user
    .findOne({
      where: {
        $or: [
          { email: req.body.login },
          { username: req.body.login },
        ]
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          errors: validationErrors
        });
      }
      if (!req.body.password || hashPassword(req.body.password) !== user.password) {
        return res.status(403).json({
          error: 'Credentials do not match'
        });
      }
      const token = generateToken(user.id);
      return Promise.resolve({token: token.value, user});
    })
    .then(result => {
      return res.json({
        token: result.token,
        user: result.user,
        errors: validationErrors
      })
    })
})

router.delete('/', (req, res) => {
  res.json({
    result: true
  })
})

module.exports = router