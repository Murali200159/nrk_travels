const Booking = require('../models/Booking.model');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

// In-memory array for fallback mock bookings in development
let mockBookings = [];

/**
 * Create a new booking
 */
const createBooking = async (bookingData) => {
  // Generate a RedBus/AbhiBus style premium booking ID
  const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingIdStr = `NRK-${todayStr}-${randomSuffix}`;

  // Parse travel date robustly
  let travelDate = bookingData.travel_date;
  if (!travelDate) {
    if (bookingData.pickupDateTime) {
      travelDate = bookingData.pickupDateTime.split('T')[0];
    } else {
      travelDate = new Date().toISOString().split('T')[0];
    }
  }

  // Robustly map fields for backwards and forwards compatibility
  const mappedData = {
    booking_id: bookingIdStr,
    customer_name: bookingData.customer_name || 'Guest',
    email: bookingData.email || bookingData.customer_email || 'no-email@nrtravels.com',
    phone: bookingData.phone || bookingData.customer_phone || '0000000000',
    booking_type: bookingData.booking_type || 'vehicle',
    vehicle_id: bookingData.vehicle_id || bookingData.fleet_id || null,
    tour_id: bookingData.tour_id || bookingData.group_tour_id || null,
    travel_date: travelDate,
    pickup_location: bookingData.pickup_location || bookingData.pickupLocation || null,
    drop_location: bookingData.drop_location || bookingData.dropLocation || null,
    passengers: bookingData.passengers ? (typeof bookingData.passengers === 'object' ? bookingData.passengers : JSON.parse(bookingData.passengers)) : null,
    amount: parseFloat(bookingData.amount || bookingData.total_amount || 0), // Old field
    total_amount: parseFloat(bookingData.actual_total_amount || bookingData.total_amount || 0),
    amount_paid: 0, // initially 0 until paid
    remaining_balance: parseFloat(bookingData.actual_total_amount || bookingData.total_amount || 0),
    payment_percentage: parseFloat(bookingData.payment_percentage || 100),
    booking_status: bookingData.booking_status || bookingData.status || 'pending',
    payment_status: bookingData.payment_status || 'pending',
    payment_id: bookingData.payment_id || null,
    order_id: bookingData.order_id || null,
    special_requests: bookingData.special_requests || bookingData.specialRequirements || null
  };

  const isMongooseConnected = mongoose.connection.readyState === 1;

  if (!isMongooseConnected) {
    console.log('[Booking Service] MongoDB disconnected. Storing booking in mock memory.');
    const mockBooking = {
      id: `mock-bk-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
      ...mappedData
    };
    mockBookings.push(mockBooking);
    return mockBooking;
  }

  try {
    const newBooking = await Booking.create(mappedData);
    return newBooking;
  } catch (error) {
    console.error('Mongoose booking insert failed:', error);
    throw new ApiError(500, `Error creating booking: ${error.message}`);
  }
};

/**
 * Get all bookings with optional filtering and pagination
 */
const getBookings = async ({ search, status, bookingType, page = 1, limit = 10 }) => {
  const query = {};

  // Optional: Search by customer email or name
  if (search) {
    query.$or = [
      { customer_name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  if (status) {
    query.booking_status = status.toLowerCase(); // E.g., 'pending', 'confirmed'
  }

  if (bookingType) {
    query.booking_type = bookingType;
  }

  // Pagination
  const skip = (page - 1) * limit;

  try {
    const bookings = await Booking.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const count = await Booking.countDocuments(query);

    return {
      bookings,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new ApiError(500, `Error fetching bookings: ${error.message}`);
  }
};

/**
 * Get booking by ID
 */
const getBookingById = async (id) => {
  if (id && id.startsWith('mock-bk-')) {
    const mockBooking = mockBookings.find(b => b.id === id);
    if (mockBooking) {
      return mockBooking;
    }
    throw new ApiError(404, 'Mock booking not found');
  }

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    return booking;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error fetching booking: ${error.message}`);
  }
};

/**
 * Update a booking (specifically its status)
 */
const updateBookingStatus = async (id, statusData) => {
  if (id && id.startsWith('mock-bk-')) {
    const mockBookingIndex = mockBookings.findIndex(b => b.id === id);
    if (mockBookingIndex !== -1) {
      if (statusData.booking_status) mockBookings[mockBookingIndex].booking_status = statusData.booking_status;
      if (statusData.status) mockBookings[mockBookingIndex].booking_status = statusData.status;
      if (statusData.payment_status) mockBookings[mockBookingIndex].payment_status = statusData.payment_status;
      return mockBookings[mockBookingIndex];
    }
    throw new ApiError(404, 'Mock booking not found');
  }

  const updatePayload = {};
  if (statusData.booking_status) updatePayload.booking_status = statusData.booking_status;
  if (statusData.status) updatePayload.booking_status = statusData.status;
  if (statusData.payment_status) updatePayload.payment_status = statusData.payment_status;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true } // return updated document
    );

    if (!updatedBooking) {
      throw new ApiError(404, 'Booking not found');
    }

    return updatedBooking;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error updating booking: ${error.message}`);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
};
