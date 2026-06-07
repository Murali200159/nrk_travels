const express = require('express');
const fleetController = require('../controllers/fleet.controller');

const router = express.Router();

router
  .route('/')
  .get(fleetController.getFleet)
  .post(fleetController.createVehicle);

router
  .route('/:id')
  .put(fleetController.updateVehicle)
  .delete(fleetController.deleteVehicle);

// GET /api/fleet/:slug
router
  .route('/:slug')
  .get(fleetController.getVehicleBySlug);

module.exports = router;
