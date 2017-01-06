const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const users = require('../collections/users');
const tokens = require('../collections/tokens');
const hashPassword = require('../utils').hashPassword;
const generateToken = require('../utils').generateToken;

const getValidToken = (tokens, userId) => {
  return tokens.findOne(userId)
    .then(token => {
      if (token && token.value) {
        try {
          jwt.verify(token.value, config.JWT_SECRET);
          return Promise.resolve(token);
        } catch (err) {
          if (err && err.name === 'TokenExpiredError') {
            return Promise.resolve(null);
          }
          throw(err);
        }
      }
      return Promise.resolve(null);
    });
};

router.post('/', (req, res) => {
  return users.filterOne(user => user.email === req.body.email)
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }
      if (!req.body.password || hashPassword(req.body.password) !== user.password) {
        return res.status(403).json({
          error: 'Credentials do not match'
        });
      }
      return getValidToken(tokens, user.id)
        .then(token => {
          if (!token) {
            token = generateToken(user.id);
            return tokens.add(token);
          }
          return Promise.resolve(token);
        })
        .then(token => {
          return res.json({
            token: token.value,
            user
          });
        });
    });
});

router.delete('/', (req, res) => {
  return tokens.delete(req.user.sub)
    .then(res.json({
      result: true
    }));
});

module.exports = router;