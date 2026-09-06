const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getSpeakers, createSpeaker, updateSpeaker, deleteSpeaker } = require('../controllers/speakerController');

router.route('/')
  .get(getSpeakers)
  .post(protect, createSpeaker);

router.route('/:id')
  .put(protect, updateSpeaker)
  .delete(protect, deleteSpeaker);

module.exports = router;
