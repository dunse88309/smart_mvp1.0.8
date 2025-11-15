const env = require("../config/env");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const payload = {
    message: err.message || "Unexpected error occurred.",
  };

  if (env.nodeEnv !== "production") {
    payload.stack = err.stack;
    payload.details = err.details;
  }

  res.status(status).json(payload);
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};


