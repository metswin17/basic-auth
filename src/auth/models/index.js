'use strict';

/**
 * @file Configures the Sequelize database connection and initializes
 * the User model.
 */

const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./users.js');

/**
 * Sequelize database connection.
 *
 * Uses DATABASE_URL when provided for the deployed Postgres database.
 * Otherwise, it uses an in-memory SQLite database for local testing.
 *
 * @type {Sequelize}
 */
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL)
  : new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
    });

/**
 * Initialized User model.
 *
 * @type {object}
 */
const User = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  User,
};