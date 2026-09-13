'use strict';

const basicAuth = require('./middleware/basic');

const express = require('express');

const { User } = require('./models');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);

  } catch (error) {
    next(error);
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;