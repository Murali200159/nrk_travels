const bookingService = require('../services/booking.service');

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const { search, status, bookingType, page, limit } = req.query;
    const result = await bookingService.getBookings({
      search,
      status,
      bookingType,
      page,
      limit,
    });
    res.status(200).json({
      success: true,
      data: result.bookings,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(id);
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.updateBookingStatus(id, req.body);
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
};
