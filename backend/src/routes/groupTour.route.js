const express = require('express');
const groupTourController = require('../controllers/groupTour.controller');

const router = express.Router();

router
  .route('/')
  .get(groupTourController.getGroupTours)
  .post(groupTourController.createGroupTour);

router
  .route('/:id')
  .put(groupTourController.updateGroupTour)
  .delete(groupTourController.deleteGroupTour);

// Placed separately to avoid conflict with :id methods in express routing
// GET /api/group-tours/:slug
router
  .route('/:slug')
  .get(groupTourController.getGroupTourBySlug);

module.exports = router;
