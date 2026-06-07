const mongoose = require('mongoose');

const vehicleTermSchema = new mongoose.Schema({
  vehicle_type: { type: String, required: true, unique: true },
  terms: [{ type: String, required: true }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('VehicleTerm', vehicleTermSchema);
