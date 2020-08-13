import { Sequelize } from 'sequelize'
const config = require('./db_config');

const env = process.env.NODE_ENV || "development";
const DB_CONFIG = config[env];

const DB = new Sequelize(DB_CONFIG);

export const checkDbConnection = async () => {
    try {
        await DB.authenticate();
        console.log('Database connected successfully.');
      } catch (error) {
        throw error;
      }
}

export default DB