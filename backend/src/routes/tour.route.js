const express = require('express');
const tourController = require('../controllers/tour.controller');

const router = express.Router();

router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);

// Use a distinct path pattern or let the controller determine if parameter is slug
// In typical REST, if :id and :slug have same path structure it's problematic
// However to match your exact requested endpoints, GET /api/tours/:slug vs PUT /api/tours/:id:
// We separate the GET by slug here. It will match GET /api/tours/<something>
router
  .route('/:slug')
  .get(tourController.getTourBySlug);

module.exports = router;
