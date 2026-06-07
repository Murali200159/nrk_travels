const express = require('express');
const careerController = require('../controllers/career.controller');

const router = express.Router();

router
  .route('/')
  .post(careerController.submitApplication)
  .get(careerController.getApplications);

module.exports = router;
