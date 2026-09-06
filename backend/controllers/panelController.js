const Panel = require('../models/Panel');

// @desc    Récupérer tous les panels/workshops, triés (public, toujours 200)
//          Renvoyé à plat : les journées elles-mêmes viennent de
//          /api/content/settings (EventSettings.days), pas d'ici.
// @route   GET /api/content/panels
exports.getPanels = async (req, res) => {
  try {
    const panels = await Panel.find().sort({ section: 1, order: 1 });
    res.status(200).json({ success: true, data: panels });
  } catch (error) {
    res.status(200).json({ success: true, data: [] });
  }
};

// @desc    Créer un panel/workshop
// @route   POST /api/content/panels
// @access  Private/Admin
exports.createPanel = async (req, res) => {
  try {
    const { section, order, title, subtitle, items, speakers } = req.body;
    const panel = await Panel.create({ section, order, title, subtitle, items, speakers });
    res.status(201).json({ success: true, data: panel });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Panel invalide.', error: error.message });
  }
};

// @desc    Mettre à jour un panel/workshop
// @route   PUT /api/content/panels/:id
// @access  Private/Admin
exports.updatePanel = async (req, res) => {
  try {
    const { section, order, title, subtitle, items, speakers } = req.body;
    const panel = await Panel.findByIdAndUpdate(
      req.params.id,
      { section, order, title, subtitle, items, speakers },
      { new: true, runValidators: true }
    );
    if (!panel) {
      return res.status(404).json({ success: false, message: 'Panel introuvable.' });
    }
    res.status(200).json({ success: true, data: panel });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Panel invalide.', error: error.message });
  }
};

// @desc    Supprimer un panel/workshop
// @route   DELETE /api/content/panels/:id
// @access  Private/Admin
exports.deletePanel = async (req, res) => {
  try {
    const panel = await Panel.findByIdAndDelete(req.params.id);
    if (!panel) {
      return res.status(404).json({ success: false, message: 'Panel introuvable.' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Suppression impossible.', error: error.message });
  }
};
