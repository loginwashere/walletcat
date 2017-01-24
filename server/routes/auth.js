const express = require('express')
const router = express.Router()
const models = require('../models')
const hashPassword = require('../utils').hashPassword
const generateToken = require('../utils').generateToken
const validation = require('../../common/validation')
const NotFoundError = require('../errors/not-found')
const ForbiddenError = require('../errors/forbidden')
const validate = require('../middleware/validate')

router.post('/', validate(validation.loginSchema), (req, res, next) => {
  models.user
    .findOne({
      where: {
        $or: [
          { email: req.body.login },
          { username: req.body.login },
        ],
        password: hashPassword(req.body.password)
      }
    })
    .then(user => {
      if (!user) {
        return next(new ForbiddenError('Credentials do not match'))
      }
      const token = generateToken(user.id);
      return res.json({
        token: token.value,
        user
      })
    })
    .catch(next)
})

router.delete('/', (req, res) => {
  res.json({
    result: true
  })
})

module.exports = router