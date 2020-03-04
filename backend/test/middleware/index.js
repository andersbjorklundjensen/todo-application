/* globals describe */

const authCheckMiddleware = require('./auth-check');

describe('Middlewares', function () {
  describe('auth-check.js - Checks login status', authCheckMiddleware);
});
