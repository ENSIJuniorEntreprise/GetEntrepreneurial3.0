const Axis = require('../models/Axis');
const cloudinary = require('../config/cloudinary');

const destroyOldImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Best-effort cleanup only — never block the DB write over a Cloudinary hiccup.
  }
};

// @desc    Récupérer les axes, triés (public, toujours 200)
// @route   GET /api/content/axes
exports.getAxes = async (req, res) => {
  try {
    const axes = await Axis.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: axes });
  } catch (error) {
    res.status(200).json({ success: true, data: [] });
  }
};

// @desc    Créer un axe
// @route   POST /api/content/axes
// @access  Private/Admin
exports.createAxis = async (req, res) => {
  try {
    const { order, image, imagePublicId, titleLine1, titleLine2, backText, ctaLabel, ctaHref } = req.body;
    const axis = await Axis.create({ order, image, imagePublicId, titleLine1, titleLine2, backText, ctaLabel, ctaHref });
    res.status(201).json({ success: true, data: axis });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Axe invalide.', error: error.message });
  }
};

// @desc    Mettre à jour un axe
// @route   PUT /api/content/axes/:id
// @access  Private/Admin
exports.updateAxis = async (req, res) => {
  try {
    const { order, image, imagePublicId, titleLine1, titleLine2, backText, ctaLabel, ctaHref } = req.body;
    const existing = await Axis.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Axe introuvable.' });
    }

    const oldPublicId = existing.imagePublicId;
    existing.set({ order, image, imagePublicId, titleLine1, titleLine2, backText, ctaLabel, ctaHref });
    const axis = await existing.save();

    if (oldPublicId && imagePublicId && oldPublicId !== imagePublicId) {
      await destroyOldImage(oldPublicId);
    }

    res.status(200).json({ success: true, data: axis });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Axe invalide.', error: error.message });
  }
};

// @desc    Supprimer un axe
// @route   DELETE /api/content/axes/:id
// @access  Private/Admin
exports.deleteAxis = async (req, res) => {
  try {
    const axis = await Axis.findByIdAndDelete(req.params.id);
    if (!axis) {
      return res.status(404).json({ success: false, message: 'Axe introuvable.' });
    }
    await destroyOldImage(axis.imagePublicId);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Suppression impossible.', error: error.message });
  }
};
