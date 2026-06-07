const Vehicle = require('../models/Vehicle.model');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

/**
 * Get all vehicles in the fleet
 */
const getFleet = async ({ search, status, page = 1, limit = 10 }) => {
  const query = { is_active: true }; // Equivalents to not DELETED

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (status) {
    if (status === 'ACTIVE') query.is_active = true;
    else if (status === 'INACTIVE') query.is_active = false;
  }

  const skip = (page - 1) * limit;

  try {
    const vehicles = await Vehicle.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const count = await Vehicle.countDocuments(query);

    return {
      vehicles,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new ApiError(500, `Error fetching fleet: ${error.message}`);
  }
};

/**
 * Get vehicle by slug (We don't have slug in Vehicle model, using id or name)
 */
const getVehicleBySlug = async (slug) => {
  try {
    // Attempting to use name or type as pseudo-slug if slug isn't defined
    const vehicle = await Vehicle.findOne({
      $or: [{ name: slug }, { type: slug }, { _id: mongoose.Types.ObjectId.isValid(slug) ? slug : null }],
      is_active: true
    });

    if (!vehicle) {
      throw new ApiError(404, 'Vehicle not found');
    }
    return vehicle;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error fetching vehicle: ${error.message}`);
  }
};

/**
 * Create a new vehicle
 */
const createVehicle = async (vehicleData) => {
  try {
    const newVehicle = await Vehicle.create(vehicleData);
    return newVehicle;
  } catch (error) {
    throw new ApiError(500, `Error creating vehicle: ${error.message}`);
  }
};

/**
 * Update an existing vehicle
 */
const updateVehicle = async (id, vehicleData) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      vehicleData,
      { new: true }
    );

    if (!updatedVehicle) {
      throw new ApiError(404, 'Vehicle not found');
    }

    return updatedVehicle;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error updating vehicle: ${error.message}`);
  }
};

/**
 * Soft delete a vehicle
 */
const softDeleteVehicle = async (id) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    );

    if (!deletedVehicle) {
      throw new ApiError(404, 'Vehicle not found');
    }

    return deletedVehicle;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error deleting vehicle: ${error.message}`);
  }
};

module.exports = {
  getFleet,
  getVehicleBySlug,
  createVehicle,
  updateVehicle,
  softDeleteVehicle,
};
