/* globals describe */


module.exports = function() {

  describe('[POST] /auth/register - Register user', require('./register'));
  describe('[POST] /auth/login - Login user', require('./login'));
  describe('[POST] /auth/logout - Logout user', require('./logout'));

};

