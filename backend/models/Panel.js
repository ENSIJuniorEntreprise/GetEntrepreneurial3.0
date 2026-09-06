const mongoose = require('mongoose');

const SpeakerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    role: { type: String, trim: true, default: '', maxlength: 200 },
    photoUrl: { type: String, trim: true, default: '' },
    photoPublicId: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const PanelSchema = new mongoose.Schema(
  {
    section: {
      // Clé libre correspondant à l'une des journées définies dans EventSettings.days
      // (plus d'enum fixe : l'admin peut ajouter/supprimer des journées).
      type: String,
      required: true,
      trim: true,
    },
    order: { type: Number, required: true, default: 0 },
    title: { type: String, required: true, trim: true, maxlength: 300 },
    subtitle: { type: String, trim: true, default: '', maxlength: 300 },
    items: { type: [String], default: [] },
    speakers: { type: [SpeakerSchema], default: [] },
  },
  { timestamps: true }
);

PanelSchema.index({ section: 1, order: 1 });

module.exports = mongoose.model('Panel', PanelSchema);
