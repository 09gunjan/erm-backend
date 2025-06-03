const { User, Assignment } = require('../models');
const { Op } = require('sequelize');

exports.getAllEngineers = async (req, res) => {
  const engineers = await User.findAll({ where: { role: 'engineer' } });
  res.json(engineers);
};

exports.getEngineerCapacity = async (req, res) => {
  const engineerId = req.params.id;
  const engineer = await User.findByPk(engineerId);
  const assignments = await Assignment.findAll({
    where: {
      engineerId,
      endDate: { [Op.gte]: new Date() },
    },
  });

  const totalAllocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
  const available = engineer.maxCapacity - totalAllocated;

  res.json({ allocated: totalAllocated, available });
};
