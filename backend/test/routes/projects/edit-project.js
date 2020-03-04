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

  it('should edit a project correctly', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);

    return supertest(server)
      .put(`/projects/${project.id}`)
      .send({
        ...project,
        name: 'changed name',
      })
      .set('authorization', user.token)
      .expect(200);
  });

  it('should not edit a project without a name', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);

    return supertest(server)
      .put(`/projects/${project.id}`)
      .send({
        ...project,
        name: null,
      })
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not edit a project without a valid project id', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);

    return supertest(server)
      .put('/projects/invalidprojectid')
      .send({
        ...project,
        name: 'changed name',
      })
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not edit a project that doesnt exist', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);

    await app.context.mongo.models.projects.deleteOne({ _id: project.id });

    return supertest(server)
      .put(`/projects/${project.id}`)
      .send({
        ...project,
        name: 'changed name',
      })
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not edit a project if the choosen name is already in use', async function () {
    const user = await auth.createUser();
    const project1 = await projects.createProject(user);
    const project2 = await projects.createProject(user);

    return supertest(server)
      .put(`/projects/${project1.id}`)
      .send({
        ...project1,
        name: project2.name,
      })
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not edit a project without an auth token', async function () {
    return supertest(server)
      .put('/projects/someid')
      .expect(401);
  });
};
