'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./users.js');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL)
  : new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
    });

const User = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  User,
};