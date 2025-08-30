const express = require('express');
const router = express.Router();

// On importe les deux fonctions depuis le contrôleur
const {
  subscribeToNewsletter,
  getAllSubscribers,
} = require('../controllers/newsletterController');

// Définit la route pour la méthode POST
router.post('/', subscribeToNewsletter);

// Définit la route pour la méthode GET
router.get('/', getAllSubscribers);

module.exports = router;