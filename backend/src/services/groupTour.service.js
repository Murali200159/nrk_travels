const GroupTour = require('../models/GroupTour.model');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const addAvailableSeats = (tour) => {
  if (!tour) return tour;
  // Convert Mongoose doc to plain object if needed
  const tourObj = tour.toObject ? tour.toObject() : tour;
  return {
    ...tourObj,
    available_seats: (tourObj.max_capacity || 0) - (tourObj.current_bookings || 0),
  };
};

/**
 * Get all group tours
 */
const getGroupTours = async ({ search, page = 1, limit = 10 }) => {
  const query = { is_active: true };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  const skip = (page - 1) * limit;

  try {
    const groupToursData = await GroupTour.find(query)
      .sort({ start_date: 1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const count = await GroupTour.countDocuments(query);

    return {
      groupTours: groupToursData.map(addAvailableSeats),
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new ApiError(500, `Error fetching group tours: ${error.message}`);
  }
};

/**
 * Get group tour by slug (using title or id as pseudo-slug)
 */
const getGroupTourBySlug = async (slug) => {
  try {
    const tour = await GroupTour.findOne({
      $or: [{ title: slug }, { _id: mongoose.Types.ObjectId.isValid(slug) ? slug : null }],
      is_active: true
    });

    if (!tour) {
      throw new ApiError(404, 'Group tour not found');
    }

    return addAvailableSeats(tour);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error fetching group tour: ${error.message}`);
  }
};

/**
 * Create a new group tour
 */
const createGroupTour = async (tourData) => {
  try {
    const newTour = await GroupTour.create({ ...tourData, current_bookings: 0 });
    return addAvailableSeats(newTour);
  } catch (error) {
    throw new ApiError(500, `Error creating group tour: ${error.message}`);
  }
};

/**
 * Update an existing group tour
 */
const updateGroupTour = async (id, tourData) => {
  try {
    const updatedTour = await GroupTour.findByIdAndUpdate(
      id,
      tourData,
      { new: true }
    );

    if (!updatedTour) {
      throw new ApiError(404, 'Group tour not found');
    }

    return addAvailableSeats(updatedTour);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error updating group tour: ${error.message}`);
  }
};

/**
 * Soft delete a group tour
 */
const softDeleteGroupTour = async (id) => {
  try {
    const deletedTour = await GroupTour.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    );

    if (!deletedTour) {
      throw new ApiError(404, 'Group tour not found');
    }

    return addAvailableSeats(deletedTour);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error deleting group tour: ${error.message}`);
  }
};

module.exports = {
  getGroupTours,
  getGroupTourBySlug,
  createGroupTour,
  updateGroupTour,
  softDeleteGroupTour,
};
