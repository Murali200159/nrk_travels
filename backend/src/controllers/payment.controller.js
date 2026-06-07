const paymentService = require('../services/payment.service');

const createOrder = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, message: 'bookingId is required' });
    }

    const order = await paymentService.createOrder(bookingId);
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const booking = await paymentService.verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const handleWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    
    if (!signature) {
      return res.status(400).json({ success: false, message: 'Signature missing' });
    }

    await paymentService.handleWebhook(req.body, signature);
    
    // Razorpay expects a 200 OK to acknowledge receipt
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    // If webhook processing fails, log it but still return 200 to prevent Razorpay from retrying infinitely
    // unless you want retries for specific errors
    console.error('Webhook error:', error);
    res.status(200).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  handleWebhook,
};
