const express = require('express')
const router = express.Router()
const models = require('../models')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const hashPassword = require('../utils').hashPassword
const generateAvatarUrl = require('../utils').generateAvatarUrl

router.post('/', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).json({
      error: 'Validation error'
    })
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
})

module.exports = router
