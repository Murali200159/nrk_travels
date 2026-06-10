const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  whatsapp: { type: String, required: true },
  pickup: { type: String, required: true },
  drop: { type: String },
  tripType: { type: String },
  date: { type: Date },
  distance: { type: Number },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

// Index for query optimization and duplicate checking
enquirySchema.index({ mobile: 1, pickup: 1, drop: 1, created_at: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
