const Contact = require('../models/Contact');

/**
 * @desc    Enregistrer un nouveau message de contact
 * @route   POST /api/contact
 * @access  Public
 */
exports.createContactMessage = async (req, res) => {
  try {
    const { prenom, nom, email, sujet, message } = req.body;

    if (!prenom || !nom || !email || !sujet || !message) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
    }

    const newMessage = await Contact.create({
      prenom,
      nom,
      email,
      sujet,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Votre message a bien été envoyé.',
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur lors de l'envoi du message.", error: error.message });
  }
};


/**
 * @desc    Récupérer tous les messages de contact
 * @route   GET /api/contact
 * @access  Private/Admin
 */
exports.getAllContactMessages = async (req, res) => {
  try {
    // Trouve tous les documents dans la collection Contact
    const messages = await Contact.find({});

    // Renvoie la liste en JSON
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur.', error: error.message });
  }
};