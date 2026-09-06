const FormOptions = require('../models/FormOptions');

const DEFAULT_FORM_OPTIONS = { regions: [], statuts: [], expertises: [], experiences: [], orgTypes: [] };

// @desc    Récupérer les options des formulaires d'inscription (public, toujours 200)
// @route   GET /api/content/form-options
exports.getFormOptions = async (req, res) => {
  try {
    const options = await FormOptions.findOne();
    res.status(200).json({ success: true, data: options || DEFAULT_FORM_OPTIONS });
  } catch (error) {
    res.status(200).json({ success: true, data: DEFAULT_FORM_OPTIONS });
  }
};

// @desc    Mettre à jour les options des formulaires (singleton, upsert)
// @route   PUT /api/content/form-options
// @access  Private/Admin
exports.updateFormOptions = async (req, res) => {
  try {
    const { regions, statuts, expertises, experiences, orgTypes } = req.body;
    const existing = await FormOptions.findOne();
    const payload = { regions, statuts, expertises, experiences, orgTypes };

    const options = existing
      ? await FormOptions.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true })
      : await FormOptions.create(payload);

    res.status(200).json({ success: true, data: options });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Options invalides.', error: error.message });
  }
};
