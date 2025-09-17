// backend/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');

// Définir la route pour obtenir les statistiques
router.route('/').get(getDashboardStats);

module.exports = router;