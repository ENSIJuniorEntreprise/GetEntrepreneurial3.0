const Participant = require('../models/Participant');
const Exposant = require('../models/Exposant');

// --- Fonctions pour les Participants ---
// @desc    Inscrire un nouveau participant
// @route   POST /api/inscriptions/participants
exports.createParticipant = async (req, res) => {
  try {
    const { prenom, nom, email, telephone, dateDeNaissance, sexe, region, statut, expertise, experience, partageInfos } = req.body;
    if (!prenom || !nom || !email || !telephone) {
      return res.status(400).json({ message: 'Veuillez remplir les champs obligatoires (prénom, nom, email, téléphone).' });
    }
    const newParticipant = await Participant.create({ prenom, nom, email, telephone, dateDeNaissance, sexe, region, statut, expertise, experience, partageInfos });
    res.status(201).json({ success: true, message: 'Inscription réussie !', data: newParticipant });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Un participant avec cet email est déjà inscrit.' });
    }
    res.status(500).json({ message: "Erreur du serveur lors de l'inscription.", error: error.message });
  }
};

// @desc    Récupérer tous les participants
// @route   GET /api/inscriptions/participants
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find({});
    res.status(200).json({ success: true, count: participants.length, data: participants });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur.', error: error.message });
  }
};

// --- Fonctions pour les Exposants ---
// @desc    Inscrire un nouvel exposant
// @route   POST /api/inscriptions/exposants
exports.createExposant = async (req, res) => {
  try {
    const { nomEntreprise, secteurActivite, typeOrganisation, nomContact, emailContact, telephone, siteWeb, description, accepteTermes } = req.body;
    if (!nomEntreprise || !nomContact || !emailContact || !telephone) {
      return res.status(400).json({ message: 'Veuillez remplir les champs obligatoires (nom entreprise, nom contact, email, téléphone).' });
    }
    const newExposant = await Exposant.create({ nomEntreprise, secteurActivite, typeOrganisation, nomContact, emailContact, telephone, siteWeb, description, accepteTermes });
    res.status(201).json({ success: true, message: 'Demande de participation reçue !', data: newExposant });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Un exposant avec cet email de contact est déjà inscrit.' });
    }
    res.status(500).json({ message: "Erreur du serveur lors de l'inscription.", error: error.message });
  }
};

// @desc    Récupérer tous les exposants
// @route   GET /api/inscriptions/exposants
exports.getAllExposants = async (req, res) => {
  try {
    const exposants = await Exposant.find({});
    res.status(200).json({ success: true, count: exposants.length, data: exposants });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur.', error: error.message });
  }
};