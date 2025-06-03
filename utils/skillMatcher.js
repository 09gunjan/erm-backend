// utils/skillMatcher.js

const { User } = require('../models');

async function findSuitableEngineers(requiredSkills) {
  if (!Array.isArray(requiredSkills)) throw new Error('requiredSkills must be an array');

  const engineers = await User.findAll({ where: { role: 'engineer' } });

  return engineers.filter(engineer =>
    requiredSkills.some(skill => engineer.skills?.includes(skill))
  );
}

module.exports = { findSuitableEngineers };
