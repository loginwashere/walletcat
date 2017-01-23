const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl
const verifyToken = require('../utils').verifyToken
const validation = require('../validation')
const mailSend = require('../services/mail').send
const emailTypes = require('../services/emailData').types
const generateEmailData = require('../services/emailData').generate
const NotFoundError = require('../errors/not-found')
const BadRequestError = require('../errors/bad-request')
const validate = require('../middleware/validate')

router.post('/', validate(validation.registerSchema), (req, res, next) => {
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
    .then(user => {
      return mailSend(generateEmailData(emailTypes.REGISTER, { user }))
        .then(body => res.json(user))
    })
    .catch(next)
})

router.post('/email-confirm', (req, res, next) => {
  let decodedToken
  try {
    decodedToken = verifyToken(req.body.emailConfirm)
  } catch (e) {
    return next(new BadRequestError('Invalid email confirm token'))
  }

  models.user
    .findOne({
      where: {
        email: decodedToken.sub
      }
    })
    .then(user => {
      if (!user) {
        return next(new NotFoundError('User not found'))
      }
      if (user.emailConfirmed) {
        return res.json({ emailConfirmed: user.emailConfirmed })
      }
      return user
        .update({
          emailConfirmed: true,
        })
        .then(user => res.json({ emailConfirmed: user.emailConfirmed }))
    })
    .catch(next)
})

module.exports = router
