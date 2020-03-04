const crypto = require('crypto');
const supertest = require('supertest');

class Projects {
  constructor(app, server) {
    this.app = app;
    this.server = server;
  }

  static constructProject() {
    return {
      id: null,
      name: crypto.randomBytes(6).toString('hex'),
      ownerId: null,
      created: null,
    };
  }

  async createProject(user) {
    const project = Projects.constructProject();

    await supertest(this.server)
      .post('/projects')
      .send(project)
      .set('authorization', user.token)
      .expect(200)
      .then((response) => {
        project.id = response.body.projectId;
      });

    return project;
  }
}

module.exports = Projects;
