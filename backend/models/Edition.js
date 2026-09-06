const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema(
  { value: { type: String, required: true, trim: true, maxlength: 20 }, label: { type: String, required: true, trim: true, maxlength: 100 } },
  { _id: false }
);

const GalleryImageSchema = new mongoose.Schema(
  { image: { type: String, trim: true, default: '' }, imagePublicId: { type: String, trim: true, default: '' }, alt: { type: String, trim: true, default: '' } },
  { _id: false }
);

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    quote: { type: String, trim: true, default: '' },
    image: { type: String, trim: true, default: '' },
    imagePublicId: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const IntroCardSchema = new mongoose.Schema(
  {
    icon: { type: String, enum: ['handshake', 'zap', 'info', 'star', 'award'], default: 'info' },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    text: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const EditionSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, default: 0 },
    slug: { type: String, required: true, trim: true, unique: true, maxlength: 100 },
    editionLabel: { type: String, required: true, trim: true, maxlength: 100 },
    year: { type: Number },
    dateVenueText: { type: String, trim: true, default: '' },
    tagline: { type: String, trim: true, default: '' },
    heroImage: { type: String, trim: true, default: '' },
    heroImagePublicId: { type: String, trim: true, default: '' },
    stats: { type: [StatSchema], default: [] },
    gallery: { type: [GalleryImageSchema], default: [] },
    testimonials: { type: [TestimonialSchema], default: [] },
    partnerLogos: { type: [GalleryImageSchema], default: [] },
    introCards: { type: [IntroCardSchema], default: [] },
  },
  { timestamps: true }
);

EditionSchema.index({ order: 1 });

module.exports = mongoose.model('Edition', EditionSchema);
