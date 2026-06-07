const Tour = require('../models/Tour.model');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

/**
 * Get all tours with optional filtering, search, and pagination
 */
const getTours = async ({ search, minPrice, maxPrice, page = 1, limit = 10 }) => {
  const query = { is_active: true };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  const skip = (page - 1) * limit;

  try {
    const tours = await Tour.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const count = await Tour.countDocuments(query);

    return {
      tours,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new ApiError(500, `Error fetching tours: ${error.message}`);
  }
};

/**
 * Get tour by slug (using title or id as pseudo-slug)
 */
const getTourBySlug = async (slug) => {
  try {
    const tour = await Tour.findOne({
      $or: [{ title: slug }, { _id: mongoose.Types.ObjectId.isValid(slug) ? slug : null }],
      is_active: true
    });

    if (!tour) {
      throw new ApiError(404, 'Tour not found');
    }

    return tour;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error fetching tour: ${error.message}`);
  }
};

/**
 * Create a new tour
 */
const createTour = async (tourData) => {
  try {
    const newTour = await Tour.create(tourData);
    return newTour;
  } catch (error) {
    throw new ApiError(500, `Error creating tour: ${error.message}`);
  }
};

/**
 * Update an existing tour
 */
const updateTour = async (id, tourData) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      tourData,
      { new: true }
    );

    if (!updatedTour) {
      throw new ApiError(404, 'Tour not found');
    }

    return updatedTour;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error updating tour: ${error.message}`);
  }
};

/**
 * Soft delete a tour (set is_active = false)
 */
const softDeleteTour = async (id) => {
  try {
    const deletedTour = await Tour.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    );

    if (!deletedTour) {
      throw new ApiError(404, 'Tour not found');
    }

    return deletedTour;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error deleting tour: ${error.message}`);
  }
};

module.exports = {
  getTours,
  getTourBySlug,
  createTour,
  updateTour,
  softDeleteTour,
};
