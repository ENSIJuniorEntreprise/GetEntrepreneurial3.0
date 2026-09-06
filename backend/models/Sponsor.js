const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    logoUrl: { type: String, trim: true, default: '' },
    logoPublicId: { type: String, trim: true, default: '' },
    category: { type: String, trim: true, default: '', maxlength: 200 },
    link: { type: String, trim: true, default: '' },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

SponsorSchema.index({ order: 1 });

module.exports = mongoose.model('Sponsor', SponsorSchema);
