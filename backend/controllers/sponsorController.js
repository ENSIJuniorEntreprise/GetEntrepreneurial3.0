const Sponsor = require('../models/Sponsor');
const cloudinary = require('../config/cloudinary');

const destroyOldLogo = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Best-effort cleanup only — never block the DB write over a Cloudinary hiccup.
  }
};

// @desc    Récupérer les sponsors/partenaires, triés (public, toujours 200)
// @route   GET /api/content/sponsors
exports.getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: sponsors });
  } catch (error) {
    res.status(200).json({ success: true, data: [] });
  }
};

// @desc    Créer un sponsor/partenaire
// @route   POST /api/content/sponsors
// @access  Private/Admin
exports.createSponsor = async (req, res) => {
  try {
    const { name, logoUrl, logoPublicId, category, link, order } = req.body;
    const sponsor = await Sponsor.create({ name, logoUrl, logoPublicId, category, link, order });
    res.status(201).json({ success: true, data: sponsor });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Sponsor invalide.', error: error.message });
  }
};

// @desc    Mettre à jour un sponsor/partenaire
// @route   PUT /api/content/sponsors/:id
// @access  Private/Admin
exports.updateSponsor = async (req, res) => {
  try {
    const { name, logoUrl, logoPublicId, category, link, order } = req.body;
    const existing = await Sponsor.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Sponsor introuvable.' });
    }

    const oldPublicId = existing.logoPublicId;
    existing.set({ name, logoUrl, logoPublicId, category, link, order });
    const sponsor = await existing.save();

    if (oldPublicId && logoPublicId && oldPublicId !== logoPublicId) {
      await destroyOldLogo(oldPublicId);
    }

    res.status(200).json({ success: true, data: sponsor });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Sponsor invalide.', error: error.message });
  }
};

// @desc    Supprimer un sponsor/partenaire
// @route   DELETE /api/content/sponsors/:id
// @access  Private/Admin
exports.deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndDelete(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ success: false, message: 'Sponsor introuvable.' });
    }
    await destroyOldLogo(sponsor.logoPublicId);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Suppression impossible.', error: error.message });
  }
};
