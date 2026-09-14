'use strict';

/**
 * @file Configures the Express application and starts the HTTP server.
 */

const express = require('express');
const authRouter = require('./auth/router.js');
const notFoundHandler = require('./error-handlers/404.js');
const serverErrorHandler = require('./error-handlers/500.js');

const app = express();

// Allow JSON data in req.body
app.use(express.json());

// Allow FORM data in req.body
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

/**
 * Handles requests to the root route and confirms the server is running.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {void}
 */
app.get('/', (req, res) => {
  res.status(200).send('Server is working');
});

// Handle unknown routes
app.use(notFoundHandler);

// Handle server/authentication errors
app.use(serverErrorHandler);

/**
 * Starts the Express server on the specified port.
 *
 * @param {number|string} port - Port on which the server will listen.
 * @returns {void}
 */
function start(port) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

module.exports = {
  app,
  start,
};