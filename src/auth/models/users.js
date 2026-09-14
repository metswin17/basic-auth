'use strict';

/**
 * @file Defines the Sequelize User model and authentication behavior.
 */

const bcrypt = require('bcrypt');

/**
 * Creates the User model.
 *
 * The model stores a username and password. Before a user is created,
 * the plaintext password is hashed with bcrypt.
 *
 * @param {object} sequelize - The Sequelize database instance.
 * @param {object} DataTypes - Sequelize data types.
 * @returns {object} The configured User model.
 */
const userModel = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  /**
   * Hashes the user's plaintext password before the record is stored.
   *
   * @param {object} user - The User instance being created.
   * @returns {Promise<void>}
   */
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  /**
   * Compares a supplied plaintext password with the stored bcrypt hash.
   *
   * @param {string} password - The plaintext password to verify.
   * @returns {Promise<boolean>} True when the password matches.
   */
  User.prototype.authenticate = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

module.exports = userModel;