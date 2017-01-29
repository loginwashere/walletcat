const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl
const verifyToken = require('../utils').verifyToken
const generateToken = require('../utils').generateToken
const registerSchema = require('../../common/validation').registerSchema
const resendEmailConfirmSchema = require('../../common/validation').resendEmailConfirmSchema
const mailSend = require('../services/mail').send
const emailTypes = require('../services/emailData').types
const generateEmailData = require('../services/emailData').generate
const NotFoundError = require('../errors/not-found')
const BadRequestError = require('../errors/bad-request')
const validate = require('../middleware/validate')

router.post('/', validate(registerSchema), (req, res, next) => {
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
    .then(user => mailSend(generateEmailData(emailTypes.REGISTER, { user }))
      .then(() => {
        const token = generateToken(user.id)
        return res.json({
          token: token.value,
          user
        })
      }))
    .catch(next)
})

router.post('/resend-email-confirm', validate(resendEmailConfirmSchema), (req, res, next) => {
  models.user
    .findOne({
      where: {
        $and: [
          { email: req.body.email }
        ]
      }
    })
    .then(user => {
      if (!user) {
        return next(new NotFoundError('User not found'))
      }
      return mailSend(generateEmailData(emailTypes.REGISTER, { user }))
        .then(() => res.json({ result: true }))
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

      const token = generateToken(user.id)
      if (user.emailConfirmed) {
        return res.json({
          token: token.value,
          user
        })
      }
      return user
        .update({
          emailConfirmed: true,
        })
        .then(user => res.json({
          token: token.value,
          user
        }))
    })
    .catch(next)
})

module.exports = router
