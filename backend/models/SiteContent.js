const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema(
  { label: { type: String, required: true, trim: true, maxlength: 100 }, href: { type: String, required: true, trim: true, maxlength: 300 } },
  { _id: false }
);

const FooterColumnSchema = new mongoose.Schema(
  { title: { type: String, required: true, trim: true, maxlength: 100 }, links: { type: [LinkSchema], default: [] } },
  { _id: false }
);

const SocialLinkSchema = new mongoose.Schema(
  { platform: { type: String, required: true, trim: true, maxlength: 50 }, url: { type: String, required: true, trim: true, maxlength: 300 } },
  { _id: false }
);

const CardSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: '' },
    text: { type: String, trim: true, default: '' },
    benefits: { type: [String], default: [] },
    ctaLabel: { type: String, trim: true, default: '' },
    ctaHref: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const SiteContentSchema = new mongoose.Schema(
  {
    navLinks: { type: [LinkSchema], default: [] },
    footer: {
      columns: { type: [FooterColumnSchema], default: [] },
      socialLinks: { type: [SocialLinkSchema], default: [] },
      contactPhone: { type: String, trim: true, default: '' },
      contactEmail: { type: String, trim: true, default: '' },
      tagline: { type: String, trim: true, default: '' },
      copyrightText: { type: String, trim: true, default: '' },
    },
    contactPage: {
      introTitle: { type: String, trim: true, default: '' },
      introText: { type: String, trim: true, default: '' },
      phones: { type: [String], default: [] },
      emails: { type: [String], default: [] },
      address: { type: String, trim: true, default: '' },
    },
    collaborationPage: {
      ctaImage: { type: String, trim: true, default: '' },
      ctaTitle: { type: String, trim: true, default: '' },
      ctaText: { type: String, trim: true, default: '' },
      ctaLinks: {
        type: [
          new mongoose.Schema(
            {
              label: { type: String, required: true, trim: true, maxlength: 100 },
              href: { type: String, required: true, trim: true, maxlength: 300 },
              isDownload: { type: Boolean, default: false },
            },
            { _id: false }
          ),
        ],
        default: [],
      },
    },
    inscriptionPage: {
      participantCard: { type: CardSchema, default: () => ({}) },
      exposantCard: { type: CardSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteContent', SiteContentSchema);
