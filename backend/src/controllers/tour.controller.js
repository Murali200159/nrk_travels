const tourService = require('../services/tour.service');

const getTours = async (req, res, next) => {
  try {
    const { search, minPrice, maxPrice, page, limit } = req.query;
    const result = await tourService.getTours({
      search,
      minPrice,
      maxPrice,
      page,
      limit,
    });
    res.status(200).json({
      success: true,
      data: result.tours,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getTourBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const tour = await tourService.getTourBySlug(slug);
    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

const createTour = async (req, res, next) => {
  try {
    const tour = await tourService.createTour(req.body);
    res.status(201).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

const updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await tourService.updateTour(id, req.body);
    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tourService.softDeleteTour(id);
    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTours,
  getTourBySlug,
  createTour,
  updateTour,
  deleteTour,
};
