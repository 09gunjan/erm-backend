
const db = require('../config/db');
const sequelize = require('../config/db');


const User = require('./User');
const Project = require('./Project');
const Assignment = require('./Assignment');

// Relationships
User.hasMany(Assignment, { foreignKey: 'engineerId' });
Assignment.belongsTo(User, { foreignKey: 'engineerId' });

Project.hasMany(Assignment, { foreignKey: 'projectId' });
Assignment.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = { sequelize, User, Project, Assignment };
