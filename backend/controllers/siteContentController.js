const SiteContent = require('../models/SiteContent');

const DEFAULT_SITE_CONTENT = {
  navLinks: [],
  footer: { columns: [], socialLinks: [], contactPhone: '', contactEmail: '', tagline: '', copyrightText: '' },
  contactPage: { introTitle: '', introText: '', phones: [], emails: [], address: '' },
  collaborationPage: { ctaImage: '', ctaTitle: '', ctaText: '', ctaLinks: [] },
  inscriptionPage: {
    participantCard: { title: '', text: '', benefits: [], ctaLabel: '', ctaHref: '' },
    exposantCard: { title: '', text: '', benefits: [], ctaLabel: '', ctaHref: '' },
  },
};

// @desc    Récupérer le contenu du site (nav, footer, pages) — public, toujours 200
// @route   GET /api/content/site
exports.getSiteContent = async (req, res) => {
  try {
    const content = await SiteContent.findOne();
    res.status(200).json({ success: true, data: content || DEFAULT_SITE_CONTENT });
  } catch (error) {
    res.status(200).json({ success: true, data: DEFAULT_SITE_CONTENT });
  }
};

// @desc    Mettre à jour le contenu du site (singleton, upsert)
// @route   PUT /api/content/site
// @access  Private/Admin
exports.updateSiteContent = async (req, res) => {
  try {
    const payload = req.body;
    const existing = await SiteContent.findOne();

    const content = existing
      ? await SiteContent.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true })
      : await SiteContent.create(payload);

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Contenu invalide.', error: error.message });
  }
};
