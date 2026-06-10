const axios = require('axios');
const config = require('../../config/env');

/**
 * Send a WhatsApp message using Meta Cloud API
 * @param {string} to - Recipient phone number
 * @param {string} body - Text message body
 */
const sendWhatsApp = async (to, body) => {
  if (!config.whatsapp || !config.whatsapp.phoneNumberId || !config.whatsapp.accessToken) {
    console.warn(`[MOCK WhatsApp] To: ${to} | Body:\n${body}`);
    return true; // Mock success if not configured
  }

  try {
    let toFormatted = to.toString().replace(/\D/g, '');
    // Basic formatting: default to India code (+91) if only 10 digits provided
    if (toFormatted.length === 10) {
      toFormatted = `91${toFormatted}`;
    }

    const url = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;
    
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: toFormatted,
      type: "text",
      text: {
        preview_url: false,
        body: body
      }
    };

    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${config.whatsapp.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`WhatsApp Sent Successfully to ${toFormatted}:`, response.data.messages?.[0]?.id);
    return true;
  } catch (error) {
    console.error(`WhatsApp Error sending to ${to}:`, error.response?.data || error.message);
    return false; // Don't throw so it doesn't crash the enquiry service
  }
};

module.exports = sendWhatsApp;
