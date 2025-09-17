const express = require('express');
const router = express.Router();
const { subscribeToNewsletter, getAllSubscribers } = require('../controllers/newsletterController');

// Route pour s'inscrire (POST) et récupérer tous les inscrits (GET)
router.route('/')
  .post(subscribeToNewsletter)
  .get(getAllSubscribers);

module.exports = router;