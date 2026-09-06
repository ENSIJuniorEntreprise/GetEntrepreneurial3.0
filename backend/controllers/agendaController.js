const AgendaItem = require('../models/AgendaItem');
const sanitize = require('../utils/sanitizeHtml');

// @desc    Récupérer le programme complet, trié (public, toujours 200)
//          Renvoyé à plat : les journées elles-mêmes viennent de /api/content/settings
//          (EventSettings.days), pas d'ici — ainsi une journée sans élément
//          s'affiche quand même comme onglet vide côté site.
// @route   GET /api/content/agenda
exports.getAgenda = async (req, res) => {
  try {
    const items = await AgendaItem.find().sort({ day: 1, order: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(200).json({ success: true, data: [] });
  }
};

// @desc    Créer un élément de programme
// @route   POST /api/content/agenda
// @access  Private/Admin
exports.createAgendaItem = async (req, res) => {
  try {
    const { day, order, time, title, speakerHtml, descriptionHtml } = req.body;
    const item = await AgendaItem.create({
      day,
      order,
      time,
      title,
      speakerHtml: sanitize(speakerHtml),
      descriptionHtml: sanitize(descriptionHtml),
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Élément de programme invalide.', error: error.message });
  }
};

// @desc    Mettre à jour un élément de programme
// @route   PUT /api/content/agenda/:id
// @access  Private/Admin
exports.updateAgendaItem = async (req, res) => {
  try {
    const { day, order, time, title, speakerHtml, descriptionHtml } = req.body;
    const item = await AgendaItem.findByIdAndUpdate(
      req.params.id,
      { day, order, time, title, speakerHtml: sanitize(speakerHtml), descriptionHtml: sanitize(descriptionHtml) },
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ success: false, message: 'Élément de programme introuvable.' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Élément de programme invalide.', error: error.message });
  }
};

// @desc    Supprimer un élément de programme
// @route   DELETE /api/content/agenda/:id
// @access  Private/Admin
exports.deleteAgendaItem = async (req, res) => {
  try {
    const item = await AgendaItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Élément de programme introuvable.' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Suppression impossible.', error: error.message });
  }
};
