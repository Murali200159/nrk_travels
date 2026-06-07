const Razorpay = require('razorpay');
const config = require('./env');

if (!config.razorpay.key_id || !config.razorpay.key_secret) {
  console.warn('[WARNING] Razorpay Key ID and Secret are not defined. Payment integration will fail.');
}

const razorpay = new Razorpay({
  key_id: config.razorpay.key_id || 'dummy_key_id',
  key_secret: config.razorpay.key_secret || 'dummy_key_secret',
});

module.exports = razorpay;
