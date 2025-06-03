const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Assignment = sequelize.define('Assignment', {
  engineerId: DataTypes.INTEGER,
  projectId: DataTypes.INTEGER,
  allocationPercentage: DataTypes.INTEGER,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  role: DataTypes.STRING,
});

module.exports = Assignment;
