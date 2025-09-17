const express = require('express');
const router = express.Router();
const { createContactMessage, getAllContactMessages } = require('../controllers/contactController');

// Route pour envoyer un message (POST) et récupérer tous les messages (GET)
router.route('/')
  .post(createContactMessage)
  .get(getAllContactMessages);

module.exports = router;