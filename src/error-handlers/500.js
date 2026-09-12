'use strict';

/**
 * Handles server errors and sends a 500 response to the client.
 *
 * @param {*} err - The error passed to the error-handling middleware.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {void}
 */


function serverErrorHandler(err, req, res, next) {
  res.status(500).send('Server Error');
}

module.exports = serverErrorHandler;