'use strict';

const { db, User } = require('../src/auth/models');

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('User Model', () => {
  test('creates a user', async () => {
    const user = await User.create({
      username: 'modeluser',
      password: 'password123',
    });

    expect(user.username).toBe('modeluser');
  });

  test('hashes the password before saving', async () => {
    const user = await User.create({
      username: 'hashuser',
      password: 'password123',
    });

    expect(user.password).not.toBe('password123');
  });

  test('authenticates a correct password', async () => {
    const user = await User.create({
      username: 'correctuser',
      password: 'password123',
    });

    const valid = await user.authenticate('password123');

    expect(valid).toBe(true);
  });

  test('rejects an incorrect password', async () => {
    const user = await User.create({
      username: 'wronguser',
      password: 'password123',
    });

    const valid = await user.authenticate('wrongpassword');

    expect(valid).toBe(false);
  });
});