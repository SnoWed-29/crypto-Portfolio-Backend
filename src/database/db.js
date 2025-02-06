const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crypto_database_passport', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;