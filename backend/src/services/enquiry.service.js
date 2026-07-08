const Enquiry = require('../models/Enquiry.model');
const sendWhatsApp = require('../utils/sendWhatsApp');
const config = require('../config/env');
const mongoose = require('mongoose');

// In-memory array for fallback mock mode in development
let mockEnquiries = [];

/**
 * Check if an enquiry is a duplicate (same mobile, pickup, drop, tripType in last 5 minutes)
 */
const isDuplicate = (existingCreatedAt) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return new Date(existingCreatedAt) >= fiveMinutesAgo;
};

/**
 * Create a new cab enquiry
 * @param {Object} enquiryData
 */
const createEnquiry = async (enquiryData) => {
  let enquiry;
  let isNew = false;
  const now = new Date();

  // Mapped details for consistency
  const mappedData = {
    name: enquiryData.name || 'Guest',
    mobile: enquiryData.mobile,
    whatsapp: enquiryData.whatsapp || enquiryData.mobile,
    pickup: enquiryData.pickup,
    drop: enquiryData.drop || '',
    tripType: enquiryData.tripType || 'Outstation',
    date: enquiryData.date ? new Date(enquiryData.date) : now,
    distance: enquiryData.distance ? Number(enquiryData.distance) : 0
  };

  const isMongooseConnected = mongoose.connection.readyState === 1;

  if (isMongooseConnected) {
    try {
      // Check for duplicate in MongoDB in the last 5 minutes
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const duplicate = await Enquiry.findOne({
        mobile: mappedData.mobile,
        pickup: mappedData.pickup,
        drop: mappedData.drop,
        tripType: mappedData.tripType,
        created_at: { $gte: fiveMinutesAgo }
      }).sort({ created_at: -1 });

      if (duplicate) {
        console.log(`[Enquiry Service] Duplicate enquiry detected in MongoDB. Returning existing: ${duplicate.id}`);
        return duplicate;
      }

      enquiry = await Enquiry.create(mappedData);
      isNew = true;
    } catch (error) {
      console.error('[Enquiry Service] Mongoose enquiry insert failed, falling back to mock mode:', error);
    }
  }

  // Fallback or Mock mode if Mongoose connection is not ready or failed
  if (!isNew) {
    // Check for duplicate in in-memory array
    const duplicate = mockEnquiries
      .filter(
        (e) =>
          e.mobile === mappedData.mobile &&
          e.pickup === mappedData.pickup &&
          e.drop === mappedData.drop &&
          e.tripType === mappedData.tripType &&
          isDuplicate(e.created_at)
      )
      .sort((a, b) => b.created_at - a.created_at)[0];

    if (duplicate) {
      console.log(`[Enquiry Service] Duplicate enquiry detected in mock memory. Returning existing: ${duplicate.id}`);
      return duplicate;
    }

    // Save in-memory
    enquiry = {
      id: `mock-enq-${Date.now()}`,
      created_at: now,
      updated_at: now,
      ...mappedData
    };
    mockEnquiries.push(enquiry);
    isNew = true;
  }

  // If a new enquiry is successfully created, trigger WhatsApp Notifications
  if (isNew) {
    console.log(`[Enquiry Service] New enquiry registered: ${enquiry.id || enquiry._id}. Dispatching WhatsApps...`);

    // 1. Build WhatsApp message for Admin
    const adminMessage = `New Cab Enquiry

Name: ${mappedData.name}
Mobile: ${mappedData.mobile}
WhatsApp: ${mappedData.whatsapp}
Trip Type: ${mappedData.tripType}
From: ${mappedData.pickup}
To: ${mappedData.drop || 'N/A'}
Distance: ${mappedData.distance} KM`.trim();

    // 2. Build WhatsApp message for Customer
    const customerMessage = `Thank you for your enquiry.

If you would like a special discount or custom offer, please contact us on this WhatsApp number.

Our team will assist you with the best available price.

Thank you.`.trim();

    // 3. Dispatch WhatsApp to Admin
    const adminPhone = config.twilio.adminPhone || '9111989222';
    const waSuccess = await sendWhatsApp(adminPhone, adminMessage);
    
    // Fallback: If WhatsApp fails (e.g., expired token), send an SMS to the Admin
    if (!waSuccess) {
      console.log("[Enquiry Service] WhatsApp failed, attempting to send SMS fallback to Admin...");
      const sendSMS = require('./notifications/sendSMS');
      await sendSMS(adminPhone, `New Cab Enquiry\nName: ${mappedData.name}\nMobile: ${mappedData.mobile}\nFrom: ${mappedData.pickup}\nTo: ${mappedData.drop || 'N/A'}`);
    }

    // 4. Dispatch WhatsApp to Customer
    await sendWhatsApp(mappedData.mobile, customerMessage);
  }

  return enquiry;
};

module.exports = {
  createEnquiry
};
