const mongoose = require('mongoose');
const { Schema } = mongoose;

const querySchema = new Schema({
  queryText: { type: String, required: true },
  conditions: { type: [String], required: true },
  nextSteps: { type: String, required: true },
  modelType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', querySchema);