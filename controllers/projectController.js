const { Project } = require('../models');

exports.getAllProjects = async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
};

exports.createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};
