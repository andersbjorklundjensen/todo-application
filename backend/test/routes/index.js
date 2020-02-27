/* globals describe */


describe('Routes', function() {

  describe('/auth/* - Authentication routes', require('./auth'));
  describe('/projects/* - Projects routes', require('./projects'));
  describe('/todos/* - Todos routes', require('./todos'));

});

