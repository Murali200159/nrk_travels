const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration_days: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String },
  image_url: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Tour', tourSchema);
