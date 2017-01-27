require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const debug = require('debug')('sequelize')

const config = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  migrationStorage: process.env.DATABASE_MIGRATION_STORAGE || 'sequelize',
  migrationStoragePath: process.env.DATABASE_MIGRATION_STORAGE_PATH || 'sequelize-meta.json',
  seederStorage: process.env.DATABASE_SEEDER_STORAGE || 'sequelize',
  logging: Boolean(process.env.DATABASE_LOGGING)
    ? debug
    : false
}

module.exports = {
  development: config,
  production: config,
  test: Object.assign({}, config, {
    url: 'postgres://postgres:postgres@localhost:5432/wallet_test',
    seederStorage: 'json',
    logging: false,
    migrationStorage: 'json',
    migrationStoragePath: 'umzug.json'
  })
}
