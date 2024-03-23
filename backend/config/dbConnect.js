const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let dbUrl = ""
let dbOptions = {}

if (process.env.TEST) {
  dbUrl = "sqlite::memory:"
  dbOptions = { logging: false }
} else {
  dbUrl = process.env.ELEPHANTSQL_URL
  dbOptions = {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { rejectUnauthorized: false }, // Enable SSL for ElephantSQL
    },
  }
}


/**
 * Sequelize instance for connecting to a PostgreSQL database using ElephantSQL.
 * It utilizes environment variables for configuration.
 *
 * @type {Sequelize} - Sequelize instance
 */
const sequelize = new Sequelize(dbUrl, dbOptions);

/**
 * Function to sync the Sequelize instance with the database.
 * This ensures that the defined models are created in the database.
 * If force is set to true, it will drop all tables and recreate them.
 *
 * @param {boolean} force - Whether to force sync and reset the database.
 * @returns {Promise<void>} - Promise indicating the sync process completion.
 */
const syncDatabase = async (force = false) => {
  return await sequelize.sync();
};

// Call the syncDatabase function with force true to reset the database
syncDatabase(true);

module.exports = {sequelize, dbSync: syncDatabase};
