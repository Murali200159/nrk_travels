const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  if (!statusCode) {
    statusCode = 500;
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler,
};
