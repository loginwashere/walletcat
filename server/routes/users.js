const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const Joi = require('joi')
const Mailgun = require('mailgun-js')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl
const generateToken = require('../utils').generateToken
const errorMessages = require('../utils').errorMessages
const validation = require('../validation')
const config = require('../config')

router.post('/', (req, res) => {
  const validationErrors = Joi.validate(req.body, validation.registerSchema)
  if (validationErrors.error) {
    return res.status(400).json({ errors:errorMessages(validationErrors) })
  }
  return models.user
    .create({
      id: v4(),
      email: req.body.email,
      emailConfirm: generateToken(req.body.email, '1d').value,
      username: req.body.username,
      avatar: generateAvatarUrl(req.body.email),
      password: hashPassword(req.body.password),
      createdAt: format(new Date()),
      updatedAt: format(new Date()),
    })
    .then(user => {
      const mailgun = new Mailgun({
        apiKey: config.mail.mailgun.apiKey,
        domain: config.mail.mailgun.domain
      });

      const emailConfirmLink = `${config.publicUrl}email-confirm/${user.emailConfirm}`
      const data = {
        from: config.mail.defaultFrom,
        to: req.body.email,
        subject: '[Wallet Cat] Please confirm your email',
        html: `
<h1>Hello</h1>
<p>Thank you for registering on wallet.pp.ua.</p>
<p>To continue please confirm your email by visiting this link:</p>
<p><a href="${emailConfirmLink}">${emailConfirmLink}</a></p>
`
      }

      return mailgun
        .messages()
        .send(data, (error, body) => {
          if (error) {
            return res.status(500).json({
              error: error.message
            })
          }
          return res.json(Object.assign({}, user.get({ plain: true}), {
            password: null,
            emailConfirm: null
          }))
        })
    })
    .catch(error => {
      return res.status(500).json({
        error: error.message
      })
    })
})

module.exports = router
