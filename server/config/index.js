//require('dotenv').config();

module.exports = {
  PORT: process.env.NODE_APP_PORT || process.env.PORT || 3001,
  HASH_SECRET: process.env.HASH_SECRET || 'abcdefg',
  JWT_SECRET: process.env.JWT_SECRET || 'shhhhhhared-secret',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1h',
  NODE_APP_SOCKET: process.env.NODE_APP_SOCKET
};