/* globals before after it */

const supertest = require('supertest');
const app = require('../../../src')();
const Auth = require('../../utils/Auth');
const Projects = require('../../utils/Projects');
const Todos = require('../../utils/Todos');

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

  it('should store a todo correctly', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = Todos.constructTodo(project);

    return supertest(server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(200, /todoId/);
  });

  it('should not store a todo without a title', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = Todos.constructTodo(project);

    return supertest(server)
      .post('/todos')
      .send({
        ...todo,
        title: null,
      })
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not store a todo without a valid project id', async function () {
    const user = await auth.createUser();
    const todo = Todos.constructTodo({ id: 'invalidprojectid' });

    return supertest(server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not store a todo with a project id for a project that doesnt exist', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);

    await app.context.mongo.models.projects.deleteOne({ _id: project.id });

    const todo = Todos.constructTodo(project);

    return supertest(server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not store a todo without an auth token', async function () {
    return supertest(server)
      .post('/todos')
      .expect(401);
  });
};
