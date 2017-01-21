require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })

const config = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  seederStorage: process.env.DATABASE_SEEDER_STORAGE || "sequelize"
}

module.exports = {
  development: config,
  production: config,
  test: Object.assign({}, config, {
    url: 'postgres://postgres:postgres@localhost:5432/wallet_test',
    seederStorage: 'json'
  })
}
