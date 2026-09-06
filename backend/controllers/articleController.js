const Article = require('../models/Article');
const cloudinary = require('../config/cloudinary');

const destroyOldImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Best-effort cleanup only — never block the DB write over a Cloudinary hiccup.
  }
};

// @desc    Récupérer les articles, triés (public, toujours 200)
// @route   GET /api/content/articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    res.status(200).json({ success: true, data: [] });
  }
};

// @desc    Créer un article
// @route   POST /api/content/articles
// @access  Private/Admin
exports.createArticle = async (req, res) => {
  try {
    const { order, image, imagePublicId, category, date, title, content } = req.body;
    const article = await Article.create({ order, image, imagePublicId, category, date, title, content });
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Article invalide.', error: error.message });
  }
};

// @desc    Mettre à jour un article
// @route   PUT /api/content/articles/:id
// @access  Private/Admin
exports.updateArticle = async (req, res) => {
  try {
    const { order, image, imagePublicId, category, date, title, content } = req.body;
    const existing = await Article.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article introuvable.' });
    }

    const oldPublicId = existing.imagePublicId;
    existing.set({ order, image, imagePublicId, category, date, title, content });
    const article = await existing.save();

    if (oldPublicId && imagePublicId && oldPublicId !== imagePublicId) {
      await destroyOldImage(oldPublicId);
    }

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Article invalide.', error: error.message });
  }
};

// @desc    Supprimer un article
// @route   DELETE /api/content/articles/:id
// @access  Private/Admin
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article introuvable.' });
    }
    await destroyOldImage(article.imagePublicId);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Suppression impossible.', error: error.message });
  }
};
