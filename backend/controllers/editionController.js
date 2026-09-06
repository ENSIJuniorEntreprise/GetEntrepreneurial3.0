const Edition = require('../models/Edition');
const cloudinary = require('../config/cloudinary');

const destroyImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Best-effort cleanup only — never block the DB write over a Cloudinary hiccup.
  }
};

const FIELDS = [
  'order', 'slug', 'editionLabel', 'year', 'dateVenueText', 'tagline',
  'heroImage', 'heroImagePublicId', 'stats', 'gallery', 'testimonials', 'partnerLogos', 'introCards',
];

const pickFields = (body) => FIELDS.reduce((acc, key) => ({ ...acc, [key]: body[key] }), {});

// @desc    Récupérer toutes les éditions, triées (public, toujours 200)
// @route   GET /api/content/editions
exports.getEditions = async (req, res) => {
  try {
    const editions = await Edition.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: editions });
  } catch (error) {
    res.status(200).json({ success: true, data: [] });
  }
};

// @desc    Récupérer une édition par son slug (public, toujours 200)
// @route   GET /api/content/editions/slug/:slug
exports.getEditionBySlug = async (req, res) => {
  try {
    const edition = await Edition.findOne({ slug: req.params.slug });
    res.status(200).json({ success: true, data: edition || null });
  } catch (error) {
    res.status(200).json({ success: true, data: null });
  }
};

// @desc    Créer une édition
// @route   POST /api/content/editions
// @access  Private/Admin
exports.createEdition = async (req, res) => {
  try {
    const edition = await Edition.create(pickFields(req.body));
    res.status(201).json({ success: true, data: edition });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Édition invalide.', error: error.message });
  }
};

// @desc    Mettre à jour une édition
// @route   PUT /api/content/editions/:id
// @access  Private/Admin
exports.updateEdition = async (req, res) => {
  try {
    const existing = await Edition.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Édition introuvable.' });
    }

    const oldHeroPublicId = existing.heroImagePublicId;
    existing.set(pickFields(req.body));
    const edition = await existing.save();

    if (oldHeroPublicId && edition.heroImagePublicId && oldHeroPublicId !== edition.heroImagePublicId) {
      await destroyImage(oldHeroPublicId);
    }

    res.status(200).json({ success: true, data: edition });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Édition invalide.', error: error.message });
  }
};

// @desc    Supprimer une édition
// @route   DELETE /api/content/editions/:id
// @access  Private/Admin
exports.deleteEdition = async (req, res) => {
  try {
    const edition = await Edition.findByIdAndDelete(req.params.id);
    if (!edition) {
      return res.status(404).json({ success: false, message: 'Édition introuvable.' });
    }

    await destroyImage(edition.heroImagePublicId);
    await Promise.all([
      ...edition.gallery.map((g) => destroyImage(g.imagePublicId)),
      ...edition.testimonials.map((t) => destroyImage(t.imagePublicId)),
      ...edition.partnerLogos.map((p) => destroyImage(p.imagePublicId)),
    ]);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Suppression impossible.', error: error.message });
  }
};
