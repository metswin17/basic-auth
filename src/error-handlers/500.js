'use strict';

/**
 * @file Handles server and authentication errors.
 */

/**
 * Sends a 500 response containing the error message.
 *
 * @param {Error} err - Error passed to the Express error handler.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
function serverErrorHandler(err, req, res, next) {
  res.status(500).send(err.message);
}

module.exports = serverErrorHandler;