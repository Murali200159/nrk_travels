const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  resume_url: { type: String },
  status: { type: String, default: 'APPLIED' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Career', careerSchema);
