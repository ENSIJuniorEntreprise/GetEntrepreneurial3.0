const mongoose = require('mongoose');

const AgendaItemSchema = new mongoose.Schema(
  {
    day: {
      // Clé libre correspondant à l'une des journées définies dans EventSettings.days
      // (plus d'enum fixe : l'admin peut ajouter/supprimer des journées).
      type: String,
      required: true,
      trim: true,
    },
    order: { type: Number, required: true, default: 0 },
    time: { type: String, required: true, trim: true, maxlength: 50 },
    title: { type: String, required: true, trim: true, maxlength: 300 },
    speakerHtml: { type: String, trim: true, default: '' },
    descriptionHtml: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

AgendaItemSchema.index({ day: 1, order: 1 });

module.exports = mongoose.model('AgendaItem', AgendaItemSchema);
