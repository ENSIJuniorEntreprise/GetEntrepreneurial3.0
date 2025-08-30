const Newsletter = require('../models/Newsletter');

/**
 * @desc    Inscrire un nouvel email à la newsletter
 * @route   POST /api/newsletter
 * @access  Public
 */
exports.subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Veuillez fournir une adresse email.' });
    }

    const newSubscriber = await Newsletter.create({ email });

    res.status(201).json({ success: true, data: newSubscriber });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Cette adresse email est déjà inscrite.' });
    }
    res.status(500).json({ message: 'Erreur du serveur.', error: error.message });
  }
};

/**
 * @desc    Récupérer tous les inscrits à la newsletter
 * @route   GET /api/newsletter
 * @access  Private/Admin
 */
exports.getAllSubscribers = async (req, res) => {
  try {
    // Trouve tous les documents dans la collection Newsletter
    const subscribers = await Newsletter.find({});

    // Renvoie la liste en JSON
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur.', error: error.message });
  }
};