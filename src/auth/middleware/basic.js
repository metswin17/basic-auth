'use strict';

const base64 = require('base-64');
const { User } = require('../models');

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