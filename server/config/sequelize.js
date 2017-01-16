module.exports = {
  development: {
    dialect: 'postgres',
    url: 'postgres://postgres:postgres@localhost:5432/postgres',
    seederStorage: "sequelize"
  },
  production: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    seederStorage: "sequelize"
  }
}
