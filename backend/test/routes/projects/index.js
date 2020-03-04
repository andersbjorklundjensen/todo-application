/* globals describe */

const storeProject = require('./store-project');
const getAllProjects = require('./get-all-projects');
const getProject = require('./get-project');
const editProject = require('./edit-project');
const deleteProject = require('./delete-project');

module.exports = function () {
  describe('[POST] /projects - Store one project', storeProject);
  describe('[GET] /projects - Get all projects', getAllProjects);
  describe('[GET] /projects/:id - Get one project and the todos for that project', getProject);
  describe('[PUT] /projects/:id - Edit a project', editProject);
  describe('[DELETE] /projects/:id - Delete project and the todos for that project', deleteProject);
};
