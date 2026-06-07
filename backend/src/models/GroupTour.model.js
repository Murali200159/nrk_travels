const mongoose = require('mongoose');

const groupTourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration_days: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String },
  image_url: { type: String },
  is_active: { type: Boolean, default: true },
  start_date: { type: Date },
  end_date: { type: Date },
  available_seats: { type: Number }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('GroupTour', groupTourSchema);
