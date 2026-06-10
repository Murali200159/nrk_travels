const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  booking_id: { type: String, required: true, unique: true },
  customer_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  booking_type: { type: String, required: true },
  vehicle_id: { type: String },
  tour_id: { type: String },
  travel_date: { type: Date, required: true },
  pickup_location: { type: String },
  drop_location: { type: String },
  passengers: { type: mongoose.Schema.Types.Mixed }, // JSONB
  amount: { type: Number, required: true }, // Keeping for backwards compatibility
  total_amount: { type: Number, required: true, default: 0 },
  amount_paid: { type: Number, default: 0 },
  remaining_balance: { type: Number, default: 0 },
  payment_percentage: { type: Number, default: 100 },
  booking_status: { type: String, default: 'pending' },
  payment_status: { type: String, default: 'pending' },
  payment_id: { type: String },
  order_id: { type: String },
  special_requests: { type: String }
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

// Indexes for performance equivalent to Supabase

bookingSchema.index({ order_id: 1 });
bookingSchema.index({ payment_status: 1 });
bookingSchema.index({ booking_status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
