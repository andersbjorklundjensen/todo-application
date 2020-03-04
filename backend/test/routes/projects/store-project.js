/* globals before after it */

const supertest = require('supertest');
const app = require('../../../src')();
const Auth = require('../../utils/Auth');
const Projects = require('../../utils/Projects');

const server = app.listen();

module.exports = function () {
  const auth = new Auth(app, server);
  const projects = new Projects(app, server);

  before(async function () {
    await app.context.mongo.dropDatabase();
  });

  after(async function () {
    app.context.mongo.close();
    server.close();
  });

  it('should store a project correctly', async function () {
    const user = await auth.createUser();
    const project = Projects.constructProject();

    return supertest(server)
      .post('/projects')
      .send(project)
      .set('authorization', user.token)
      .expect(200, /projectId/);
  });

  it('should not store a project without a correct name', async function () {
    const user = await auth.createUser();
    const project = Projects.constructProject();

    return supertest(server)
      .post('/projects')
      .send({
        ...project,
        name: null,
      })
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not store a project with a name that is already in use', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);

    return supertest(server)
      .post('/projects')
      .send(project)
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not store a project without an auth token', async function () {
    return supertest(server)
      .post('/projects')
      .expect(401);
  });
};
