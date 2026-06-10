const express = require('express');
const healthRoute = require('./health.route');
const tourRoute = require('./tour.route');
const groupTourRoute = require('./groupTour.route');
const fleetRoute = require('./fleet.route');
const bookingRoute = require('./booking.route');
const paymentRoute = require('./payment.route');
const contactRoute = require('./contact.route');
const careerRoute = require('./career.route');
const dashboardRoute = require('./dashboard.route');
const enquiryRoute = require('./enquiry.route');

const router = express.Router();

const routes = [
  {
    path: '/',
    route: healthRoute,
  },
  {
    path: '/tours',
    route: tourRoute,
  },
  {
    path: '/group-tours',
    route: groupTourRoute,
  },
  {
    path: '/fleet',
    route: fleetRoute,
  },
  {
    path: '/bookings',
    route: bookingRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path: '/careers',
    route: careerRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
  {
    path: '/enquiries',
    route: enquiryRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
