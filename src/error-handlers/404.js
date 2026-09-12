'use strict';

/**
 * Handles requests for routes or methods that are not found.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {void}
 */


function notFoundHandler(req, res, next) {
  res.status(404).send('Not Found');
}

module.exports = notFoundHandler;