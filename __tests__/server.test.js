'use strict';

const supertest = require('supertest');

const { app } = require('../src/server');
const { db, User } = require('../src/auth/models');
const basicAuth = require('../src/auth/middleware/basic');
const base64 = require('base-64');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Auth Routes', () => {

  test('POST /signup creates a new user', async () => {
    const response = await request.post('/signup').send({
      username: 'testuser',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');
    expect(response.body.password).not.toBe('password123');
  });


test('POST /signin logs in a valid user', async () => {
  await request.post('/signup').send({
    username: 'signinuser',
    password: 'password123',
  });

  const response = await request
    .post('/signin')
    .auth('signinuser', 'password123');

  expect(response.status).toBe(200);
  expect(response.body.user.username).toBe('signinuser');
});

test('POST /signin rejects an invalid password', async () => {
  await request.post('/signup').send({
    username: 'invaliduser',
    password: 'password123',
  });

  const response = await request
    .post('/signin')
    .auth('invaliduser', 'wrongpassword');

  expect(response.status).toBe(500);
  expect(response.text).toBe('Invalid Login');
});


}); 

describe('Basic Auth Middleware', () => {

  test('adds a valid user to req.user', async () => {
    await User.create({
      username: 'middlewareuser',
      password: 'password123',
    });

    const req = {
      headers: {
        authorization: `Basic ${base64.encode(
          'middlewareuser:password123'
        )}`,
      },
    };

    const next = jest.fn();

    await basicAuth(req, {}, next);

    expect(req.user.username).toBe('middlewareuser');
    expect(next).toHaveBeenCalledWith();
  });

  test('rejects invalid credentials', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode(
          'nouser:wrongpassword'
        )}`,
      },
    };
  
    const next = jest.fn();
  
    await basicAuth(req, {}, next);
  
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].message).toBe('Invalid Login');
  });


});