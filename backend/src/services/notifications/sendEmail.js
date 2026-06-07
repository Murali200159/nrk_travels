const nodemailer = require('nodemailer');
const config = require('../../config/env');

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

/**
 * Send an email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} htmlBody - HTML body content
 */
const sendEmail = async (to, subject, htmlBody) => {
  try {
    const info = await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject,
      html: htmlBody,
    });
    console.log(`Email sent successfully to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    return false;
  }
};

module.exports = sendEmail;
