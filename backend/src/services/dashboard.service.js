const Tour = require('../models/Tour.model');
const GroupTour = require('../models/GroupTour.model');
const Vehicle = require('../models/Vehicle.model');
const Booking = require('../models/Booking.model');
const Contact = require('../models/Contact.model');
const Career = require('../models/Career.model');
const ApiError = require('../utils/ApiError');

/**
 * Get aggregate statistics for the admin dashboard
 */
const getDashboardStats = async () => {
  try {
    // We can run these aggregate count queries in parallel to speed up the response
    const [
      toursCount,
      groupToursCount,
      fleetCount,
      bookingsCount,
      contactsCount,
      careersCount,
      revenueBookings,
    ] = await Promise.all([
      Tour.countDocuments(),
      GroupTour.countDocuments(),
      Vehicle.countDocuments(),
      Booking.countDocuments(),
      Contact.countDocuments(),
      Career.countDocuments(),
      
      // For revenue, fetch completed booking amounts and sum them up
      Booking.find({ payment_status: { $in: ['paid', 'COMPLETED'] } }, 'amount total_amount'),
    ]);

    // Calculate total revenue from successful bookings
    const totalRevenue = revenueBookings.reduce((sum, booking) => sum + Number(booking.amount || booking.total_amount || 0), 0);

    return {
      totalTours: toursCount || 0,
      totalGroupTours: groupToursCount || 0,
      totalFleet: fleetCount || 0,
      totalBookings: bookingsCount || 0,
      totalContacts: contactsCount || 0,
      totalCareers: careersCount || 0,
      totalRevenue: totalRevenue,
    };
  } catch (error) {
    throw new ApiError(500, `Error fetching dashboard stats: ${error.message}`);
  }
};

module.exports = {
  getDashboardStats,
};
