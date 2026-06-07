const Contact = require('../models/Contact.model');
const ApiError = require('../utils/ApiError');

/**
 * Submit a new contact message
 */
const submitContact = async (contactData) => {
  try {
    const newContact = await Contact.create(contactData);
    return newContact;
  } catch (error) {
    throw new ApiError(500, `Error submitting contact message: ${error.message}`);
  }
};

/**
 * Get all contact messages with optional pagination and filtering
 */
const getContacts = async ({ status, page = 1, limit = 10 }) => {
  const query = {};

  if (status) {
    query.status = status.toUpperCase(); // 'NEW', 'IN_PROGRESS', 'RESOLVED'
  }

  const skip = (page - 1) * limit;

  try {
    const contacts = await Contact.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const count = await Contact.countDocuments(query);

    return {
      contacts,
      pagination: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw new ApiError(500, `Error fetching contacts: ${error.message}`);
  }
};

module.exports = {
  submitContact,
  getContacts,
};
