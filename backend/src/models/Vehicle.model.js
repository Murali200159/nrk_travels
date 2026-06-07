const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  price_per_km: { type: Number, required: true },
  image_url: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Vehicle', vehicleSchema);
