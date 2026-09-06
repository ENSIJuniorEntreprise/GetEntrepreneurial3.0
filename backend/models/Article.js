const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true, default: 0 },
    image: { type: String, trim: true, default: '' },
    imagePublicId: { type: String, trim: true, default: '' },
    category: { type: String, required: true, trim: true, maxlength: 100 },
    date: { type: String, required: true, trim: true, maxlength: 50 },
    title: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

ArticleSchema.index({ order: 1 });

module.exports = mongoose.model('Article', ArticleSchema);
