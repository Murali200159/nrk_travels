const sendEmail = require('./notifications/sendEmail');
const sendSMS = require('./notifications/sendSMS');
const sendWhatsApp = require('./notifications/sendWhatsApp');
const config = require('../config/env');

/**
 * Get Trip Name dynamically based on booking type
 */
const getTripName = (booking) => {
  if (booking.booking_type === 'tour') return booking.tour_id || 'NRK Premium Tour';
  if (booking.booking_type === 'group_tour') return booking.tour_id || 'NRK Group Tour';
  if (booking.booking_type === 'vehicle') return `Vehicle Rental: ${booking.vehicle_id || 'Standard Vehicle'}`;
  if (booking.booking_type === 'hire_driver') return 'Hire a Driver Service';
  return 'NRK Travels Trip';
};

/**
 * Format date to standard string
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
};

/**
 * Triggers full automated post-payment notifications
 * Generates highly detailed templates
 * @param {Object} booking Mongoose Booking Document
 */
const notifyPostPayment = async (booking) => {
  try {
    const tripName = getTripName(booking);
    const dateFormatted = formatDate(booking.travel_date);
    const amountPaidStr = booking.amount_paid.toLocaleString('en-IN');
    const remainingBalanceStr = booking.remaining_balance.toLocaleString('en-IN');
    
    const isPartial = booking.remaining_balance > 0;

    // ----- CUSTOMER MESSAGE BUILDER -----
    let customerMessage = `Booking Confirmation - NRK Travels\n\n`;
    customerMessage += `Customer Name: ${booking.customer_name}\n`;
    customerMessage += `Booking ID: ${booking.booking_id}\n`;
    customerMessage += `Vehicle Name / Tour Name: ${tripName}\n`;
    customerMessage += `Travel Date: ${dateFormatted}\n`;
    customerMessage += `Pickup Location: ${booking.pickup_location || 'As specified during booking'}\n`;
    customerMessage += `Amount Paid: ₹${amountPaidStr}\n`;
    customerMessage += `Payment Status: ${booking.payment_status.toUpperCase()}\n`;
    customerMessage += `Booking Status: ${booking.booking_status.toUpperCase()}\n\n`;
    
    if (isPartial) {
      customerMessage += `Remaining Balance: ₹${remainingBalanceStr}\n`;
      customerMessage += `Please clear the remaining amount before the travel date.\n\n`;
    } else {
      customerMessage += `Remaining Balance: ₹0\n`;
      customerMessage += `Your booking is fully confirmed. Enjoy your trip.\n\n`;
    }

    const termsAndConditions = `Terms & Conditions:

• Extra kilometers after the package limit will be charged at ₹20/km.
• Extra hours after the package time limit will be charged at ₹400/hour.
• Driver allowance (Bhatta) is ₹200/day.
• Toll gate charges and parking charges must be paid by the customer.
• Driver food and accommodation should be arranged/provided by the customer during outstation trips.
• Any additional charges not included in the package must be borne by the customer.
• Customer should carry valid ID proof during the journey.
• Booking cancellation and refund policy will be applicable as per NRK Travels terms.

Thank you for choosing NRK Travels.

For support:
📞 +91 7799009855
📧 support@nrktravels.com

Have a safe and pleasant journey.`;

    customerMessage += termsAndConditions;

    // ----- ADMIN MESSAGE BUILDER -----
    const adminMessage = `ADMIN ALERT: New Payment Received\n\nCustomer: ${booking.customer_name}\nPhone: ${booking.phone}\nBooking ID: ${booking.booking_id}\nPayment ID: ${booking.payment_id}\n\nTrip: ${tripName}\nTravel Date: ${dateFormatted}\n\nTotal Amount: ₹${booking.total_amount.toLocaleString('en-IN')}\nAmount Paid: ₹${amountPaidStr}\nRemaining Balance: ₹${remainingBalanceStr}\n\nStatus: ${booking.booking_status.toUpperCase()}`;

    // ----- DISPATCH NOTIFICATIONS -----
    
    // 1. Customer SMS
    if (booking.phone) {
      await sendSMS(booking.phone, customerMessage);
    }

    // 2. Customer WhatsApp
    if (booking.phone) {
      await sendWhatsApp(booking.phone, customerMessage);
    }

    // 3. Customer Email
    if (booking.email && booking.email !== 'no-email@nrtravels.com') {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #334155;">
          <div style="text-align: center; border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #059669; margin: 0; font-size: 24px;">NRK Travels</h1>
            <p style="margin: 5px 0 0; color: #64748b; font-size: 14px;">Booking Confirmation</p>
          </div>
          
          <div style="margin-bottom: 25px; background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 10px;"><strong>Customer Name:</strong> ${booking.customer_name}</p>
            <p style="margin: 0 0 10px;"><strong>Booking ID:</strong> ${booking.booking_id}</p>
            <p style="margin: 0 0 10px;"><strong>Vehicle Name / Tour Name:</strong> ${tripName}</p>
            <p style="margin: 0 0 10px;"><strong>Travel Date:</strong> ${dateFormatted}</p>
            <p style="margin: 0 0 10px;"><strong>Pickup Location:</strong> ${booking.pickup_location || 'As specified during booking'}</p>
            <p style="margin: 0 0 10px;"><strong>Amount Paid:</strong> ₹${amountPaidStr}</p>
            <p style="margin: 0 0 10px;"><strong>Payment Status:</strong> <span style="color: #059669; font-weight: bold;">${booking.payment_status.toUpperCase()}</span></p>
            <p style="margin: 0 0 0;"><strong>Booking Status:</strong> ${booking.booking_status.toUpperCase()}</p>
          </div>

          <div style="margin-bottom: 30px; padding: 15px; border-left: 4px solid #059669; background-color: #ecfdf5;">
            ${isPartial ? 
              `<p style="margin: 0 0 8px; font-weight: bold; font-size: 16px; color: #065f46;">Remaining Balance: ₹${remainingBalanceStr}</p>
               <p style="margin: 0; color: #064e3b;">Please clear the remaining amount before the travel date.</p>` 
              : 
              `<p style="margin: 0 0 8px; font-weight: bold; font-size: 16px; color: #065f46;">Remaining Balance: ₹0</p>
               <p style="margin: 0; color: #064e3b;">Your booking is fully confirmed. Enjoy your trip.</p>`
            }
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #0f172a; font-size: 16px; margin-bottom: 15px;">Terms & Conditions:</h3>
            <ul style="padding-left: 20px; line-height: 1.6; color: #475569; font-size: 14px; margin: 0;">
              <li>Extra kilometers after the package limit will be charged at ₹20/km.</li>
              <li>Extra hours after the package time limit will be charged at ₹400/hour.</li>
              <li>Driver allowance (Bhatta) is ₹200/day.</li>
              <li>Toll gate charges and parking charges must be paid by the customer.</li>
              <li>Driver food and accommodation should be arranged/provided by the customer during outstation trips.</li>
              <li>Any additional charges not included in the package must be borne by the customer.</li>
              <li>Customer should carry valid ID proof during the journey.</li>
              <li>Booking cancellation and refund policy will be applicable as per NRK Travels terms.</li>
            </ul>
          </div>

          <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p style="font-weight: bold; color: #0f172a; margin: 0 0 15px;">Thank you for choosing NRK Travels.</p>
            <p style="margin: 0 0 5px; font-size: 14px; color: #64748b;">For support:</p>
            <p style="margin: 0 0 5px; font-weight: bold;">📞 +91 7799009855</p>
            <p style="margin: 0 0 15px;"><a href="mailto:support@nrktravels.com" style="color: #059669; text-decoration: none;">📧 support@nrktravels.com</a></p>
            <p style="margin: 0; font-style: italic; color: #059669; font-weight: bold;">Have a safe and pleasant journey.</p>
          </div>
        </div>
      `;
      await sendEmail(booking.email, `Booking Confirmation - ${booking.booking_id}`, emailHtml);
    }

    // 4. Admin Email
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f8fafc;">
        <h2 style="color: #0f172a;">Admin Notification</h2>
        <p style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${adminMessage}</p>
      </div>
    `;
    const adminEmail = 'saripillimurali59@gmail.com';
    await sendEmail(adminEmail, `Payment Alert: ${booking.booking_id}`, adminEmailHtml);

    // 5. Admin WhatsApp (Optional, if PERSONAL_PHONE is set in config)
    if (config.twilio && config.twilio.adminPhone) {
      await sendWhatsApp(config.twilio.adminPhone, adminMessage);
    }

    return true;
  } catch (error) {
    console.error('Error in paymentNotificationService:', error);
    return false;
  }
};

module.exports = {
  notifyPostPayment
};
