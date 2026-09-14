'use strict';

/**
 * @file Defines the authentication routes for user signup and signin.
 */

const basicAuth = require('./middleware/basic');

const express = require('express');

const { User } = require('./models');

const router = express.Router();

/**
 * Creates a new user account.
 *
 * The User model hashes the supplied password before the new
 * user record is stored in the database.
 *
 * @param {object} req - Express request object containing user credentials.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>}
 */
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);

  } catch (error) {
    next(error);
  }
});

/**
 * Returns the authenticated user after Basic Authentication middleware
 * successfully validates the supplied credentials.
 *
 * @param {object} req - Express request object containing req.user.
 * @param {object} res - Express response object.
 * @returns {void}
 */
router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;