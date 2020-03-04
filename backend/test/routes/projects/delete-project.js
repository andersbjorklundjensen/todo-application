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

  it('should delete a project correctly', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);

    return supertest(server)
      .del(`/projects/${project.id}`)
      .set('authorization', user.token)
      .expect(200);
  });

  it('should not get a project with a invalid project id', async function () {
    const user = await auth.createUser();

    return supertest(server)
      .del('/projects/invalidprojectid')
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not get a project that isnt owned by the user', async function () {
    const user1 = await auth.createUser();
    const user2 = await auth.createUser();

    const project = await projects.createProject(user1);

    return supertest(server)
      .del(`/projects/${project.id}`)
      .set('authorization', user2.token)
      .expect(400);
  });

  it('should not delete a project without an auth token', async function () {
    return supertest(server)
      .del('/projects/asdf')
      .expect(401);
  });
};
