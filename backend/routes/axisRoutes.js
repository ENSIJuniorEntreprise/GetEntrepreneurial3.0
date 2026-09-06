const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAxes, createAxis, updateAxis, deleteAxis } = require('../controllers/axisController');

router.route('/')
  .get(getAxes)
  .post(protect, createAxis);

router.route('/:id')
  .put(protect, updateAxis)
  .delete(protect, deleteAxis);

module.exports = router;
