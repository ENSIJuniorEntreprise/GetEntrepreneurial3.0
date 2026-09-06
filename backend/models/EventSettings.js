const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    date: { type: Date },
  },
  { _id: false }
);

const EventSettingsSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true, default: 'Get Entrepreneurial 3.0' },
    tagline: { type: String, trim: true, default: '' },
    aboutText: { type: String, trim: true, default: '' },
    heroImageUrl: { type: String, trim: true, default: '' },
    heroVideoUrl: { type: String, trim: true, default: '' },
    days: { type: [DaySchema], default: [] },
    registrationDeadline: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EventSettings', EventSettingsSchema);
