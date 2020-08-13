
const path = require('path');
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database/db.sqlite')
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database/db.sqlite')
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgresql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};