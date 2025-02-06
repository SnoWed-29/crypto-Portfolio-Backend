const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // name of the target model
      key: 'id' // key in the target model that we're referencing
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'Portfolios',
  timestamps: true
});

Portfolio.associate = function(models) {
  Portfolio.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Portfolio.hasMany(models.Transaction, { foreignKey: 'portfolioId', as: 'transactions' });
};

module.exports = Portfolio;