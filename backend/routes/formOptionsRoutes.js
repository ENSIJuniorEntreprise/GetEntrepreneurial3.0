const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getFormOptions, updateFormOptions } = require('../controllers/formOptionsController');

router.route('/')
  .get(getFormOptions)
  .put(protect, updateFormOptions);

module.exports = router;
