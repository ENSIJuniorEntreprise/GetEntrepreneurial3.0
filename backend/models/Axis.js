const mongoose = require('mongoose');

const AxisSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, default: 0 },
    image: { type: String, trim: true, default: '' },
    imagePublicId: { type: String, trim: true, default: '' },
    titleLine1: { type: String, required: true, trim: true, maxlength: 150 },
    titleLine2: { type: String, trim: true, default: '', maxlength: 150 },
    backText: { type: String, trim: true, default: '' },
    ctaLabel: { type: String, trim: true, default: '' },
    ctaHref: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

AxisSchema.index({ order: 1 });

module.exports = mongoose.model('Axis', AxisSchema);
