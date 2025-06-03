const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.ENUM('engineer', 'manager'),
  skills: { type: DataTypes.JSON },
  seniority: DataTypes.ENUM('junior', 'mid', 'senior'),
  maxCapacity: DataTypes.INTEGER,
  department: DataTypes.STRING,
});

module.exports = User;
