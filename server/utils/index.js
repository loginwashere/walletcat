const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

const generateToken = userId => ({
  id: userId,
  value: jwt.sign(
    { sub: userId },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES }
  )
});
module.exports.generateToken = generateToken;

const hashPassword = password => {
  return crypto
    .createHmac('sha256', config.HASH_SECRET)
    .update(password)
    .digest('hex')
};
module.exports.hashPassword = hashPassword;

const md5 = string => {
  return crypto
    .createHash('md5')
    .update(string)
    .digest("hex");
}

const generateAvatarUrl = email => (
  `https://www.gravatar.com/avatar/${md5('admin@mail.com')}?s=50`
);
module.exports.generateAvatarUrl = generateAvatarUrl;