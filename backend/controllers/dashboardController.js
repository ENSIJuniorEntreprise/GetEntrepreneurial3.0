// backend/controllers/dashboardController.js

const Participant = require('../models/Participant');
const Exposant = require('../models/Exposant');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

/**
 * @desc    Récupérer les statistiques globales pour le dashboard
 * @route   GET /api/stats
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Utiliser Promise.all pour exécuter toutes les requêtes de comptage en parallèle
    // C'est beaucoup plus rapide que de les faire l'une après l'autre
    const [participantCount, exposantCount, contactCount, newsletterCount] = await Promise.all([
      Participant.countDocuments(),
      Exposant.countDocuments(),
      Contact.countDocuments(),
      Newsletter.countDocuments()
    ]);

    // Renvoyer un seul objet JSON avec toutes les statistiques
    res.status(200).json({
      success: true,
      participants: participantCount,
      exposants: exposantCount,
      contacts: contactCount,
      newsletters: newsletterCount,
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Erreur du serveur lors de la récupération des statistiques.', 
      error: error.message 
    });
  }
};