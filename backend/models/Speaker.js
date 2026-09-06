const mongoose = require('mongoose');

const SpeakerSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, default: 0 },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    title: { type: String, trim: true, default: '', maxlength: 200 },
    image: { type: String, trim: true, default: '' },
    imagePublicId: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

SpeakerSchema.index({ order: 1 });

module.exports = mongoose.model('Speaker', SpeakerSchema);
