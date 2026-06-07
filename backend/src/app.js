const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const routes = require('./routes');
const { errorHandler } = require('./middleware/error');
const ApiError = require('./utils/ApiError');

const app = express();

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: config.cors.origin,
  optionsSuccessStatus: 200,
}));

// API Routes
app.use('/api', routes);

// Send back 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
