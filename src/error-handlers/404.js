'use strict';

/**
 * @file Handles requests to routes that do not exist.
 */

/**
 * Sends a 404 Not Found response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
function notFoundHandler(req, res, next) {
  res.status(404).send('Not Found');
}

module.exports = notFoundHandler;