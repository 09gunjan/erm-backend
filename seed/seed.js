const { sequelize, User, Project, Assignment } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const password = await bcrypt.hash('password123', 10);

    const [manager, eng1, eng2, eng3] = await Promise.all([
      User.create({ name: 'Alice', email: 'alice@example.com', password, role: 'manager' }),
      User.create({
        name: 'Bob',
        email: 'bob@example.com',
        password,
        role: 'engineer',
        skills: ['React', 'Node.js'],
        seniority: 'mid',
        maxCapacity: 100,
        department: 'Frontend',
      }),
      User.create({
        name: 'Charlie',
        email: 'charlie@example.com',
        password,
        role: 'engineer',
        skills: ['Python', 'Node.js'],
        seniority: 'senior',
        maxCapacity: 100,
        department: 'Backend',
      }),
      User.create({
        name: 'Diana',
        email: 'diana@example.com',
        password,
        role: 'engineer',
        skills: ['React', 'Python'],
        seniority: 'junior',
        maxCapacity: 50,
        department: 'FullStack',
      }),
    ]);

    const project1 = await Project.create({
      name: 'Inventory App',
      description: 'Manages inventory across branches',
      startDate: new Date(),
      endDate: new Date('2025-08-01'),
      requiredSkills: ['React', 'Node.js'],
      teamSize: 3,
      status: 'active',
      managerId: manager.id,
    });

    const project2 = await Project.create({
      name: 'Analytics Tool',
      description: 'Real-time analytics dashboard',
      startDate: new Date(),
      endDate: new Date('2025-10-01'),
      requiredSkills: ['Python'],
      teamSize: 2,
      status: 'planning',
      managerId: manager.id,
    });

    await Assignment.bulkCreate([
      {
        engineerId: eng1.id,
        projectId: project1.id,
        allocationPercentage: 60,
        startDate: new Date(),
        endDate: new Date('2025-08-01'),
        role: 'Developer',
      },
      {
        engineerId: eng2.id,
        projectId: project1.id,
        allocationPercentage: 40,
        startDate: new Date(),
        endDate: new Date('2025-08-01'),
        role: 'Tech Lead',
      },
      {
        engineerId: eng3.id,
        projectId: project2.id,
        allocationPercentage: 50,
        startDate: new Date(),
        endDate: new Date('2025-10-01'),
        role: 'Developer',
      },
    ]);

    console.log('✅ Seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
