'use strict';

/**
 * @file Application entry point. Connects to the database and starts
 * the Express server.
 */

require('dotenv').config();

const { db } = require('./src/auth/models');
const server = require('./src/server');

const PORT = process.env.PORT || 3000;

/**
 * Synchronizes the database and starts the application server.
 *
 * Database connection errors are caught and logged without starting
 * the server.
 *
 * @returns {Promise<void>}
 */
async function startApplication() {
  try {
    await db.sync();
    server.start(PORT);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

startApplication();