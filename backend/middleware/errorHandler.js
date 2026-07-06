import { config } from '../config/index.js';

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.stack || err.message}`);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Custom API Error structure
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Include stack trace only in development
  if (config.nodeEnv === 'development') {
    response.stack = err.stack;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    response.message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json(response);
  }

  // Handle Mongoose Cast Error (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    response.message = `Resource not found with id of ${err.value}`;
    return res.status(404).json(response);
  }

  // Handle JWT error
  if (err.name === 'JsonWebTokenError') {
    response.message = 'Not authorized, token failed';
    return res.status(401).json(response);
  }

  // Handle JWT expired
  if (err.name === 'TokenExpiredError') {
    response.message = 'Not authorized, token expired';
    return res.status(401).json(response);
  }

  res.status(statusCode).json(response);
};
