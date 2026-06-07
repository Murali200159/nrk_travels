const Career = require('../models/Career.model');
const ApiError = require('../utils/ApiError');

/**
 * Submit a new job application
 */
const submitApplication = async (applicationData) => {
  try {
    const newApplication = await Career.create(applicationData);
    return newApplication;
  } catch (error) {
    throw new ApiError(500, `Error submitting application: ${error.message}`);
  }
};

/**
 * Get all job applications with optional pagination and position filtering
 */
const getApplications = async ({ position, page = 1, limit = 10 }) => {
  const query = {};

  if (position) {
    query.position = { $regex: position, $options: 'i' };
  }

  const skip = (page - 1) * limit;

  try {
    const applications = await Career.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const count = await Career.countDocuments(query);

    return {
      applications,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new ApiError(500, `Error fetching applications: ${error.message}`);
  }
};

module.exports = {
  submitApplication,
  getApplications,
};
