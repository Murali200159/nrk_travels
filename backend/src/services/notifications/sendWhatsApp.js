const twilio = require('twilio');
const config = require('../../config/env');

let twilioClient;

try {
  if (config.twilio && config.twilio.accountSid && config.twilio.authToken) {
    twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
  }
} catch (error) {
  console.error("Twilio initialization failed for WhatsApp:", error);
}

/**
 * Send a WhatsApp message using Twilio
 * @param {string} to - Recipient phone number (E.164 format: +919876543210)
 * @param {string} body - Text message body
 */
const sendWhatsApp = async (to, body) => {
  if (!twilioClient || !config.twilio.phoneNumber) {
    console.warn(`[MOCK WHATSAPP] To: ${to} | Body: ${body}`);
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
      from: `whatsapp:${config.twilio.phoneNumber}`,
      to: `whatsapp:${toFormatted}`
    });

    console.log(`Twilio WhatsApp Sent Successfully to ${toFormatted}: SID ${message.sid}`);
    return true;
  } catch (error) {
    console.error(`Twilio Error sending WhatsApp to ${to}:`, error);
    return false;
  }
};

module.exports = sendWhatsApp;
