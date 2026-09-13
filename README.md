# Basic Authentication

An Express server implementing Basic Authentication with user signup and signin.

## Author

Luis R Lopez

## Overview

This application provides authentication using Express, Sequelize, bcrypt, and Basic Authentication.

Users can create an account through the `/signup` route. Passwords are hashed with bcrypt before being stored in the database.

Registered users can sign in through the `/signin` route using a Basic Authentication header. The authentication middleware decodes the credentials, finds the user, and compares the supplied password with the stored bcrypt hash.

## Routes

### POST /signup

Creates a new user.

Example request body:

{
  "username": "testuser",
  "password": "password123"
}

Successful response:

- Status: 201
- Returns the created user object

### POST /signin

Authenticates an existing user using Basic Authentication.

Successful response:

- Status: 200
- Returns the authenticated user object

Invalid credentials are passed to the error handler with the message:

`Invalid Login`

## Tests

Tests are written with Jest and Supertest.

The test suite verifies:

- User signup
- Password hashing
- Valid signin
- Invalid signin
- Basic Authentication middleware
- `req.user` is populated after successful authentication

Run the tests with:

`npm test`

## UML

## UML

![Authentication UML](./assets/authentication-uml.png)

## AI Usage

AI assistance was used while developing the automated tests for this lab.

Prompt used:

> Help me create Jest and Supertest tests for a Basic Authentication Express application. The tests need to verify POST /signup, POST /signin using Basic Auth, invalid login behavior, and Basic Authentication middleware that places a valid user on req.user.

AI assistance was used to help structure the tests and explain their behavior. The resulting tests were reviewed, run locally, and verified with all tests passing.

## Deployment

Live application:

https://basic-auth-vrh4.onrender.com

## Pull Request

Pull Request #1: https://github.com/metswin17/basic-auth/pull/1

