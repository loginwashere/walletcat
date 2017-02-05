const axios = require('axios')
const format = require('date-fns/format')
const v4 = require('uuid/v4')
const express = require('express')
const router = express.Router()
const models = require('../models')
const generateToken = require('../utils').generateToken
const generateAvatarUrl = require('../utils').generateAvatarUrl
const generateUsername = require('../utils').generateUsername
const config = require('../config')
const debug = require('debug')('routes:oauth')
const NotFoundError = require('../errors/not-found')

router.get('/callback/:provider', (req, res, next) => {
  debug(req.query)
  debug(req.body)

  switch (true) {
    case Boolean(req.query.code):
      debug('req.query.code', req.query.code)
      axios
        .get('https://graph.facebook.com/v2.8/oauth/access_token', {
          maxRedirects: 30,
          params: {
            client_id: config.fbAppId,
            redirect_uri: `${config.apiUrl}api/oauth/callback/${req.params.provider}`,
            client_secret: config.fbAppSecret,
            code: req.query.code
          }
        })
        .then(response => {
          debug(response.data)
          axios
            .get('https://graph.facebook.com/v2.8/me', {
              maxRedirects: 30,
              params: {
                locale: 'en_US',
                fields: 'name,email',
                access_token: response.data.access_token
              }
            })
            .then(userDataResponse => {
              debug(userDataResponse.data)
              models.user
                .findOne({
                  where: {
                    email: userDataResponse.data.email
                  },
                  paranoid: false
                })
                .then(user => {
                  if (!user) {
                    return models.user
                      .create({
                        id: v4(),
                        email: userDataResponse.data.email,
                        emailConfirmed: true,
                        username: generateUsername(userDataResponse.data.email),
                        avatar: generateAvatarUrl(userDataResponse.data.email),
                        password: null,
                        createdAt: format(new Date()),
                        updatedAt: format(new Date()),
                        fbUserId: userDataResponse.data.id,
                        fbAccessToken: response.data.access_token,
                        fbAccesstokenExpireAt: format(new Date(Date.now() + response.data.expires_in * 1000))
                      })
                      .then(user => {
                        const token = generateToken(user.id)
                        return res.redirect(`${config.publicUrl}sign-in?token=${token.value}&id=${token.id}`)
                      })
                  }
                  if (
                    user.fbUserId !== userDataResponse.data.id ||
                    user.fbAccessToken !== response.data.access_token
                  ) {
                    return user
                      .update({
                        fbUserId: userDataResponse.data.id,
                        fbAccessToken: response.data.access_token,
                        fbAccesstokenExpireAt: format(new Date(Date.now() + response.data.expires_in * 1000)),
                        updatedAt: format(new Date())
                      })
                      .then(user => {
                        const token = generateToken(user.id)
                        return res.redirect(`${config.publicUrl}sign-in?token=${token.value}&id=${token.id}`)
                      })
                  }
                  const token = generateToken(user.id)
                  return res.redirect(`${config.publicUrl}sign-in?token=${token.value}&id=${token.id}`)
                })
            })
        })
        .catch(next)
      break
    case Boolean(req.query.popup): {
      debug('req.query.popup', req.query.popup)
      const apiVersion = '2.8'
      const clientId = config.fbAppId
      const redirectUri = `${config.apiUrl}api/oauth/callback/${req.params.provider}`
      const scope = 'public_profile,email'
      const params = `client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
      const url = `https://www.facebook.com/v${apiVersion}/dialog/oauth?${params}`
      return res.redirect(url)
    }
    default:
      next(new NotFoundError('Unsupported callback'))
  }
})

module.exports = router
