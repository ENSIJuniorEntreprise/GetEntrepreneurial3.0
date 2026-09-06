const EventSettings = require('../models/EventSettings');

const DEFAULT_SETTINGS = {
  eventName: 'Get Entrepreneurial 3.0',
  tagline: '',
  aboutText: '',
  heroImageUrl: '',
  heroVideoUrl: '',
  days: [],
  registrationDeadline: null,
};

// @desc    Récupérer les réglages de l'événement (public, toujours 200)
// @route   GET /api/content/settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await EventSettings.findOne();
    res.status(200).json({ success: true, data: settings || DEFAULT_SETTINGS });
  } catch (error) {
    res.status(200).json({ success: true, data: DEFAULT_SETTINGS });
  }
};

// @desc    Mettre à jour les réglages de l'événement (singleton, upsert)
// @route   PUT /api/content/settings
// @access  Private/Admin
exports.updateSettings = async (req, res) => {
  try {
    const { eventName, tagline, aboutText, heroImageUrl, heroVideoUrl, days, registrationDeadline } = req.body;

    if (!eventName || !eventName.trim()) {
      return res.status(400).json({ success: false, message: "Le nom de l'événement est requis." });
    }

    const existing = await EventSettings.findOne();
    const payload = { eventName, tagline, aboutText, heroImageUrl, heroVideoUrl, days, registrationDeadline };

    const settings = existing
      ? await EventSettings.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true })
      : await EventSettings.create(payload);

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Réglages invalides.', error: error.message });
  }
};
