const express = require('express');
const bookingController = require('../controllers/booking.controller');

const router = express.Router();

router
  .route('/')
  .post(bookingController.createBooking)
  .get(bookingController.getBookings);

router
  .route('/:id')
  .get(bookingController.getBookingById)
  .put(bookingController.updateBookingStatus);

module.exports = router;
