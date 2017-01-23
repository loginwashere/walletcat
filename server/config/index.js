require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })

const env = process.env.NODE_ENV || 'development'
const sequelizeConfig = require('./sequelize')[env]

module.exports = {
  projectName: process.env.PROJECT_NAME,
  publicUrl: process.env.PUBLIC_URL,
  PORT: process.env.NODE_APP_PORT || process.env.PORT || 3001,
  HASH_SECRET: process.env.HASH_SECRET || 'abcdefg',
  JWT_SECRET: process.env.JWT_SECRET || 'shhhhhhared-secret',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1h',
  NODE_APP_SOCKET: process.env.NODE_APP_SOCKET,
  db: sequelizeConfig,
  mail: {
    defaultFrom: process.env.MAIL_DEFAULT_FROM || 'no-reply@mail.com',
    mailgun: {
      apiKey: process.env.MAIL_MAILGUN_API_KEY || 'MAILGUN-API-KEY',
      domain: process.env.MAIL_MAILGUN_DOMAIN || 'YOUR-DOMAIN.com'
    }
  }
}
