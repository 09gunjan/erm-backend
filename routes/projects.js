const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/projectController');
const restrictTo = require('../middleware/role');


router.post('/', auth, restrictTo('manager'), controller.createProject);


router.get('/', auth, controller.getAllProjects);
router.get('/:id', auth, controller.getProjectById);
router.post('/', auth, controller.createProject);

module.exports = router;

const { body, validationResult } = require('express-validator');

router.post(
  '/',
  auth,
  [
    body('name').notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
    body('status').isIn(['planning', 'active', 'completed']),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  controller.createProject
);

