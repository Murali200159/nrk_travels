const express = require('express');
const paymentController = require('../controllers/payment.controller');

const router = express.Router();

router.post('/create-order', paymentController.createOrder);
router.post('/verify', paymentController.verifyPayment);
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
