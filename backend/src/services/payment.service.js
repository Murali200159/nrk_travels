const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const config = require('../config/env');
const Booking = require('../models/Booking.model');
const ApiError = require('../utils/ApiError');
const notificationService = require('./paymentNotificationService');
const bookingService = require('./booking.service');
const mongoose = require('mongoose');

/**
 * Create a new Razorpay order for a booking
 */
const createOrder = async (bookingId) => {
  // 1. Fetch booking details to get the amount
  let booking;
  try {
    booking = await bookingService.getBookingById(bookingId);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      throw error;
    }
    throw new ApiError(500, `Error fetching booking: ${error.message}`);
  }

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Ensure amount is valid and not already paid
  if (booking.payment_status === 'paid') {
    throw new ApiError(400, 'Booking is already paid');
  }

  const orderAmount = booking.amount || 0;
  const customerEmail = booking.email || 'no-email@nrtravels.com';

  // 2. Create Razorpay order
  const options = {
    amount: Math.round(orderAmount * 100), // amount in smallest currency unit (paise)
    currency: 'INR',
    receipt: `receipt_booking_${bookingId}`,
    notes: {
      booking_id: bookingId.toString(),
      customer_email: customerEmail
    }
  };

  let order;
  try {
    order = await razorpay.orders.create(options);
  } catch (error) {
    throw new ApiError(500, `Failed to create Razorpay order: ${error.message}`);
  }

  // 3. Update booking with order_id and set status/payment_status to pending
  try {
    if (bookingId.toString().startsWith('mock-bk-')) {
      // For mock bookings, we can update via the service or directly modify the object 
      // but since bookingService.updateBookingStatus doesn't support updating order_id directly,
      // we might need to rely on the fact that mock objects are references, but let's be safe.
      booking.order_id = order.id;
      booking.booking_status = 'pending';
      booking.payment_status = 'pending';
    } else {
      await Booking.findByIdAndUpdate(bookingId, { 
        order_id: order.id, 
        booking_status: 'pending',
        payment_status: 'pending' 
      });
    }
  } catch (updateError) {
    throw new ApiError(500, `Failed to update booking with order ID: ${updateError.message}`);
  }

  return order;
};

/**
 * Verify payment signature sent from the frontend client
 */
const verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, 'Missing payment verification details');
  }

  // Generate expected signature
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', config.razorpay.key_secret)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    // Set payment status to failed in database
    await Booking.findOneAndUpdate(
      { order_id: razorpay_order_id },
      { payment_status: 'failed', booking_status: 'pending' }
    );
    throw new ApiError(400, 'Invalid payment signature');
  }

  // Check if already paid to prevent double notifications
  const existingBooking = await Booking.findOne({ order_id: razorpay_order_id });

  if (existingBooking && existingBooking.payment_status === 'paid') {
    return existingBooking;
  }

  // Calculate new balances based on what was just paid
  const amountPaidNow = existingBooking.amount;
  const newRemainingBalance = Math.max(0, existingBooking.total_amount - amountPaidNow);
  const newBookingStatus = newRemainingBalance > 0 ? 'partially_paid' : 'confirmed';

  // Valid signature, update booking status to confirmed and payment_status to paid
  let updatedBooking;
  try {
    updatedBooking = await Booking.findOneAndUpdate(
      { order_id: razorpay_order_id },
      {
        payment_id: razorpay_payment_id,
        payment_status: 'paid',
        booking_status: newBookingStatus,
        amount_paid: amountPaidNow,
        remaining_balance: newRemainingBalance
      },
      { new: true }
    );
  } catch (error) {
    throw new ApiError(500, `Error updating booking after verification: ${error.message}`);
  }

  if (!updatedBooking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Trigger Notifications async
  notificationService.notifyPostPayment(updatedBooking);

  return updatedBooking;
};

/**
 * Handle incoming Razorpay Webhook Events
 */
const handleWebhook = async (webhookBody, signature) => {
  const secret = config.razorpay.webhook_secret;
  
  if (!secret) {
    throw new ApiError(500, 'Webhook secret not configured');
  }

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(webhookBody))
    .digest('hex');

  if (expectedSignature !== signature) {
    throw new ApiError(400, 'Invalid webhook signature');
  }

  const { event, payload } = webhookBody;

  if (event === 'payment.captured' || event === 'order.paid') {
    const paymentEntity = payload.payment.entity;
    const order_id = paymentEntity.order_id;
    const payment_id = paymentEntity.id;
    const payment_method = paymentEntity.method;

    // Check existing status to avoid duplicate notifications
    try {
      const booking = await Booking.findOne({ order_id: order_id });

      if (booking && booking.payment_status !== 'paid') {
        // Calculate new balances based on what was just paid
        const amountPaidNow = booking.amount;
        const newRemainingBalance = Math.max(0, booking.total_amount - amountPaidNow);
        const newBookingStatus = newRemainingBalance > 0 ? 'partially_paid' : 'confirmed';

        // Update booking based on order_id
        const updatedBooking = await Booking.findOneAndUpdate(
          { order_id: order_id },
          {
            payment_id: payment_id,
            payment_status: 'paid',
            booking_status: newBookingStatus,
            amount_paid: amountPaidNow,
            remaining_balance: newRemainingBalance
          },
          { new: true }
        );

        if (updatedBooking) {
          console.log(`Booking ${order_id} marked paid via Webhook.`);
          // Trigger Notifications async
          notificationService.notifyPostPayment(updatedBooking);
        }
      }
    } catch (error) {
      console.error(`Webhook error updating booking ${order_id}:`, error);
    }
  }

  return { received: true };
};

module.exports = {
  createOrder,
  verifyPayment,
  handleWebhook
};
