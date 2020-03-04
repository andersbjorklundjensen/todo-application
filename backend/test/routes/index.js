/* globals describe */

const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const todoRoutes = require('./todos');

describe('Routes', function () {
  describe('/auth/* - Authentication routes', authRoutes);
  describe('/projects/* - Projects routes', projectRoutes);
  describe('/todos/* - Todos routes', todoRoutes);
});
