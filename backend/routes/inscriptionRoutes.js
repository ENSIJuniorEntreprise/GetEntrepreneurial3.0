const express = require('express');
const router = express.Router();
const {
  createParticipant,
  getAllParticipants,
  createExposant,
  getAllExposants
} = require('../controllers/inscriptionController');

// Routes pour les participants
router.route('/participants')
  .post(createParticipant)
  .get(getAllParticipants);

// Routes pour les exposants
router.route('/exposants')
  .post(createExposant)
  .get(getAllExposants);

module.exports = router;