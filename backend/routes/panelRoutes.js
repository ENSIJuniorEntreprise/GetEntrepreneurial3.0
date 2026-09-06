const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getPanels, createPanel, updatePanel, deletePanel } = require('../controllers/panelController');

router.route('/')
  .get(getPanels)
  .post(protect, createPanel);

router.route('/:id')
  .put(protect, updatePanel)
  .delete(protect, deletePanel);

module.exports = router;
