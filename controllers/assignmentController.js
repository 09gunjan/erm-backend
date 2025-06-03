const { Assignment, Project, User } = require('../models');

exports.getAll = async (req, res) => {
  const assignments = await Assignment.findAll({ include: [User, Project] });
  res.json(assignments);
};

exports.create = async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.json(assignment);
};

exports.update = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);
  if (!assignment) return res.status(404).json({ error: 'Not found' });
  await assignment.update(req.body);
  res.json(assignment);
};

exports.remove = async (req, res) => {
  const assignment = await Assignment.findByPk(req.params.id);
  if (!assignment) return res.status(404).json({ error: 'Not found' });
  await assignment.destroy();
  res.json({ message: 'Deleted' });
};
