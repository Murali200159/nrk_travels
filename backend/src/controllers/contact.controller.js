const contactService = require('../services/contact.service');

const submitContact = async (req, res, next) => {
  try {
    const contact = await contactService.submitContact(req.body);
    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const result = await contactService.getContacts({
      status,
      page,
      limit,
    });
    res.status(200).json({
      success: true,
      data: result.contacts,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
};
