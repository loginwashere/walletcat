const express = require('express');
const router = express.Router();
const usersCollection = require('../collections/users');
const hashPassword = require('../utils').hashPassword;
const generateAvatarUrl = require('../utils').generateAvatarUrl;
const createUser = require('../models/user');

router.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).json({
      error: 'Validation error'
    })
  }
  const user = createUser({
    email: req.body.email,
    username: req.body.username,
    avatar: generateAvatarUrl(req.body.email),
    password: hashPassword(req.body.password)
  });
  usersCollection.add(user)
    .then(user => res.json(user));
});

module.exports = router;
