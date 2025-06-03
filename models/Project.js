const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  requiredSkills: { type: DataTypes.JSON },
  teamSize: DataTypes.INTEGER,
  status: DataTypes.ENUM('planning', 'active', 'completed'),
  managerId: DataTypes.INTEGER,
});

module.exports = Project;
