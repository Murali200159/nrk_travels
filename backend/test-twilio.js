require('dotenv').config({ path: require('path').resolve(__dirname, 'backend/.env') });
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: 'Test WhatsApp message from Twilio',
    from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
    to: 'whatsapp:+917799009855'
  })
  .then(message => console.log('Message sent! SID:', message.sid))
  .catch(error => console.error('Error sending message:', error));
