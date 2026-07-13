const twilio = require('twilio');
const config = require('../../config/env');

let twilioClient;

try {
  if (config.twilio && config.twilio.accountSid && config.twilio.authToken) {
    twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
  }
} catch (error) {
  console.error("Twilio initialization failed:", error);
}

/**
 * Send an SMS using Twilio
 * @param {string} to - Recipient phone number (E.164 format: +919876543210)
 * @param {string} body - Text message body
 */
const sendSMS = async (to, body) => {
  if (!twilioClient || !twilioClient.messages || !config.twilio || !config.twilio.phoneNumber) {
    console.warn(`[MOCK SMS] To: ${to} | Body: ${body}`);
    return true; // Return true to mock success in dev
  }

  try {
    let toFormatted = to;
    // Basic E.164 formatting check for India (+91) if missing
    if (!toFormatted.startsWith('+')) {
      toFormatted = `+91${toFormatted}`;
    }

    const message = await twilioClient.messages.create({
      body: body,
      from: config.twilio.phoneNumber,
      to: toFormatted
    });

    console.log(`Twilio SMS Sent Successfully to ${toFormatted}: SID ${message.sid}`);
    return true;
  } catch (error) {
    console.error(`Twilio Error sending SMS to ${to}:`, error);
    return false;
  }
};

module.exports = sendSMS;
