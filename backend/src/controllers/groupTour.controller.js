const groupTourService = require('../services/groupTour.service');

const getGroupTours = async (req, res, next) => {
  try {
    const { search, page, limit } = req.query;
    const result = await groupTourService.getGroupTours({
      search,
      page,
      limit,
    });
    res.status(200).json({
      success: true,
      data: result.groupTours,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getGroupTourBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const groupTour = await groupTourService.getGroupTourBySlug(slug);
    res.status(200).json({
      success: true,
      data: groupTour,
    });
  } catch (error) {
    next(error);
  }
};

const createGroupTour = async (req, res, next) => {
  try {
    const groupTour = await groupTourService.createGroupTour(req.body);
    res.status(201).json({
      success: true,
      data: groupTour,
    });
  } catch (error) {
    next(error);
  }
};

const updateGroupTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const groupTour = await groupTourService.updateGroupTour(id, req.body);
    res.status(200).json({
      success: true,
      data: groupTour,
    });
  } catch (error) {
    next(error);
  }
};

const deleteGroupTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    await groupTourService.softDeleteGroupTour(id);
    res.status(200).json({
      success: true,
      message: 'Group tour deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGroupTours,
  getGroupTourBySlug,
  createGroupTour,
  updateGroupTour,
  deleteGroupTour,
};
