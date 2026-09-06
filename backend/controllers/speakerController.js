const Speaker = require('../models/Speaker');
const cloudinary = require('../config/cloudinary');

const destroyOldImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Best-effort cleanup only — never block the DB write over a Cloudinary hiccup.
  }
};

// @desc    Récupérer les conférenciers (accueil), triés (public, toujours 200)
// @route   GET /api/content/speakers
exports.getSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: speakers });
  } catch (error) {
    res.status(200).json({ success: true, data: [] });
  }
};

// @desc    Créer un conférencier
// @route   POST /api/content/speakers
// @access  Private/Admin
exports.createSpeaker = async (req, res) => {
  try {
    const { order, name, title, image, imagePublicId, description } = req.body;
    const speaker = await Speaker.create({ order, name, title, image, imagePublicId, description });
    res.status(201).json({ success: true, data: speaker });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Conférencier invalide.', error: error.message });
  }
};

// @desc    Mettre à jour un conférencier
// @route   PUT /api/content/speakers/:id
// @access  Private/Admin
exports.updateSpeaker = async (req, res) => {
  try {
    const { order, name, title, image, imagePublicId, description } = req.body;
    const existing = await Speaker.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Conférencier introuvable.' });
    }

    const oldPublicId = existing.imagePublicId;
    existing.set({ order, name, title, image, imagePublicId, description });
    const speaker = await existing.save();

    if (oldPublicId && imagePublicId && oldPublicId !== imagePublicId) {
      await destroyOldImage(oldPublicId);
    }

    res.status(200).json({ success: true, data: speaker });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Conférencier invalide.', error: error.message });
  }
};

// @desc    Supprimer un conférencier
// @route   DELETE /api/content/speakers/:id
// @access  Private/Admin
exports.deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker) {
      return res.status(404).json({ success: false, message: 'Conférencier introuvable.' });
    }
    await destroyOldImage(speaker.imagePublicId);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Suppression impossible.', error: error.message });
  }
};
