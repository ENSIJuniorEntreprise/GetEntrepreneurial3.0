const mongoose = require('mongoose');

const FormOptionsSchema = new mongoose.Schema(
  {
    regions: { type: [String], default: [] },
    statuts: { type: [String], default: [] },
    expertises: { type: [String], default: [] },
    experiences: { type: [String], default: [] },
    orgTypes: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FormOptions', FormOptionsSchema);
