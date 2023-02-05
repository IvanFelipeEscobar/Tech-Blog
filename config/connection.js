require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_URI, {
      dialectOptions: {
        decimalNumbers: true,
      }
    });

module.exports = sequelize;
