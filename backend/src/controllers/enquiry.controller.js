const enquiryService = require('../services/enquiry.service');
const ApiError = require('../utils/ApiError');

/**
 * Handle new cab enquiry creation
 */
const createEnquiry = async (req, res, next) => {
  try {
    const { name, mobile, pickup } = req.body;

    if (!mobile || mobile.trim() === '') {
      throw new ApiError(400, 'Mobile number is required');
    }
    if (!pickup || pickup.trim() === '') {
      throw new ApiError(400, 'Pickup location is required');
    }

    const enquiry = await enquiryService.createEnquiry(req.body);

    res.status(201).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry
};
