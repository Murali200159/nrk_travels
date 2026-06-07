const express = require('express');
const contactController = require('../controllers/contact.controller');

const router = express.Router();

router
  .route('/')
  .post(contactController.submitContact)
  .get(contactController.getContacts);

module.exports = router;
