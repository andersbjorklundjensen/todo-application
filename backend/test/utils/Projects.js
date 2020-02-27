
const crypto = require('crypto'),
  supertest = require('supertest');

class Projects {

  constructor(app, server) {
    this._app = app;
    this._server = server;
  }

  constructProject() {

    return {
      id: null,
      name: crypto.randomBytes(6).toString('hex'),
      ownerId: null,
      created: null
    }

  }

  async createProject(user) {

    let project = this.constructProject();

    await supertest(this._server)
      .post('/projects')
      .send(project)
      .set('authorization', user.token)
      .expect(200)
      .then((response) => project.id = response.body.projectId);

    return project;

  }

}

module.exports = Projects;
