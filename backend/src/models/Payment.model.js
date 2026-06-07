const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },
  amount: { type: Number, required: true },
  payment_status: { type: String, default: 'pending' }
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: false },
  toJSON: { 
    virtuals: true, 
    transform: function(doc, ret) { 
      ret.id = ret._id.toString(); 
      delete ret._id; 
      delete ret.__v; 
    } 
  }
});

paymentSchema.index({ razorpay_order_id: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
