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
  const todos = new Todos(app, server);

  before(async function () {
    await app.context.mongo.dropDatabase();
  });

  after(async function () {
    app.context.mongo.close();
    server.close();
  });

  it('should delete a todo correctly', async function () {
    const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = await todos.createTodo(user, project);

    return supertest(server)
      .del(`/todos/${todo.id}`)
      .set('authorization', user.token)
      .expect(200);
  });

  it('should not delete a todo without a valid todo id', async function () {
    const user = await auth.createUser();

    return supertest(server)
      .del('/todos/someid')
      .set('authorization', user.token)
      .expect(400);
  });

  it('should not delete a todo that is owned by another user', async function () {
    const user1 = await auth.createUser();
    const user2 = await auth.createUser();

    const project = await projects.createProject(user1);
    const todo = await todos.createTodo(user1, project);

    return supertest(server)
      .del(`/todos/${todo.id}`)
      .set('authorization', user2.token)
      .expect(400);
  });

  it('should not delete a todo without an auth token', async function () {
    return supertest(server)
      .del('/todos/someid')
      .expect(401);
  });
};
