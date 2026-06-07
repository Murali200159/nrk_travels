const careerService = require('../services/career.service');

const submitApplication = async (req, res, next) => {
  try {
    const application = await careerService.submitApplication(req.body);
    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const getApplications = async (req, res, next) => {
  try {
    const { position, page, limit } = req.query;
    const result = await careerService.getApplications({
      position,
      page,
      limit,
    });
    res.status(200).json({
      success: true,
      data: result.applications,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getApplications,
};
