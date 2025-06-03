const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineerController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getAllEngineers);
router.get('/:id/capacity', auth, controller.getEngineerCapacity);

module.exports = router;

// Add this route to suggest engineers based on skills
router.post('/match', auth, async (req, res) => {
    try {
      const { requiredSkills } = req.body;
      const { findSuitableEngineers } = require('../utils/skillMatcher');
      const matched = await findSuitableEngineers(requiredSkills);
      res.json(matched);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Skill matching failed' });
    }
  });