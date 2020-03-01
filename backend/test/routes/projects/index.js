/* globals describe */


module.exports = function() {

  describe('[POST] /projects - Store one project', require('./store-project'));
  describe('[GET] /projects - Get all projects', require('./get-all-projects'));
  describe('[GET] /projects/:id - Get one project and the todos for that project', require('./get-project'));
  describe('[PUT] /projects/:id - Edit a project', require('./edit-project'));
  describe('[DELETE] /projects/:id - Delete project and the todos for that project', require('./delete-project'));

};

