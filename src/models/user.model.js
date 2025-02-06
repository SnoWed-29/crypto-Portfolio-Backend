const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const argon2 = require('argon2');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    autoIncrement: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await argon2.hash(user.password);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        user.password = await argon2.hash(user.password);
      }
    }
  }
});

User.prototype.validatePassword = async function(password) {
  return await argon2.verify(this.password, password);
};

module.exports = User;