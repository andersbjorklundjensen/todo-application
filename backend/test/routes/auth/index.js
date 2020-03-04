/* globals describe */

const registerRoute = require('./register');
const loginRoute = require('./login');
const logoutRoute = require('./logout');

module.exports = function () {
  describe('[POST] /auth/register - Register user', registerRoute);
  describe('[POST] /auth/login - Login user', loginRoute);
  describe('[POST] /auth/logout - Logout user', logoutRoute);
};
