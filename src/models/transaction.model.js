const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  coin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  coinPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  portfolioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Portfolios', // name of the target model
      key: 'id' // key in the target model that we're referencing
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'Transactions',
  timestamps: true
});

Transaction.associate = function(models) {
  Transaction.belongsTo(models.Portfolio, { foreignKey: 'portfolioId', as: 'portfolio' });
};

module.exports = Transaction;