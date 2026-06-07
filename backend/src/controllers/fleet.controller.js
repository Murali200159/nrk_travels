const fleetService = require('../services/fleet.service');

const getFleet = async (req, res, next) => {
  try {
    const { search, status, page, limit } = req.query;
    const result = await fleetService.getFleet({
      search,
      status,
      page,
      limit,
    });
    res.status(200).json({
      success: true,
      data: result.vehicles,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getVehicleBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const vehicle = await fleetService.getVehicleBySlug(slug);
    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

const createVehicle = async (req, res, next) => {
  try {
    const vehicle = await fleetService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await fleetService.updateVehicle(id, req.body);
    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    await fleetService.softDeleteVehicle(id);
    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFleet,
  getVehicleBySlug,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
