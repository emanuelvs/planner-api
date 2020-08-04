import { Sequelize } from 'sequelize'
const config = require('../config/config.json')

const env = process.env.NODE_ENV || "development"
const DB_CONFIG = config[env]

const DB = new Sequelize(
  DB_CONFIG['database'],
  DB_CONFIG['username'],
  DB_CONFIG['password']
  ,
  DB_CONFIG)

export default DB