'use strict';

/**
 * @file Basic Authentication middleware for validating user credentials.
 */

const base64 = require('base-64');
const { User } = require('../models');

/**
 * Validates a user's Basic Authentication credentials.
 *
 * Decodes the Authorization header, finds the matching user,
 * verifies the supplied password, and attaches the authenticated
 * user to req.user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>}
 */
const basicAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new Error('Invalid Login'));
  }

  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = base64.decode(encodedCredentials);

  const [username, password] = decodedCredentials.split(':');

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return next(new Error('Invalid Login'));
    }

    const valid = await user.authenticate(password);

    if (!valid) {
      return next(new Error('Invalid Login'));
    }

    req.user = user;
    next();

  } catch (error) {
    next(error);
  }

};

module.exports = basicAuth;