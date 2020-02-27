
const supertest = require('supertest'),
      app = require('../../../src')(),
      Auth = require('../../utils/Auth'),
  Projects = require('../../utils/Projects'),
  Todos = require('../../utils/Todos');

const server = app.listen();

module.exports = function() {

  const auth = new Auth(app, server);
  const projects = new Projects(app, server);
  const todos = new Todos(app, server);
  
  before(async function() {

    await app.context.mongo.dropDatabase();

  });

  after(async function() {

    app.context.mongo.close();
    server.close();

  });

  it('should edit a todo correctly', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = await todos.createTodo(user, project);

    return supertest(server)
      .put(`/todos/${todo.id}`)
      .send({
        ...todo,
        title: 'changed title'
      })
      .set('authorization', user.token)
      .expect(200);

  });

  it('should not edit a todo without a valid title', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = await todos.createTodo(user, project);

    return supertest(server)
      .put(`/todos/${todo.id}`)
      .send({
        ...todo,
        title: null
      })
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not edit a todo without a valid done status', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = await todos.createTodo(user, project);

    return supertest(server)
      .put(`/todos/${todo.id}`)
      .send({
        ...todo,
        doneStatus: 'notaboolean'
      })
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not edit a todo without a valid project id', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = await todos.createTodo(user, project);

    return supertest(server)
      .put(`/todos/${todo.id}`)
      .send({
        ...todo,
        projectId: 'notavalidprojectid'
      })
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not edit a todo with a project id for non-existing project', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = await todos.createTodo(user, project);

    await app.context.mongo.models.projects.deleteOne({ _id: project.id });

    return supertest(server)
      .put(`/todos/${todo.id}`)
      .send(todo)
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not edit a todo that doesnt exist', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = await todos.createTodo(user, project);

    await app.context.mongo.models.todos.deleteOne({ _id: todo.id });

    return supertest(server)
      .put(`/todos/${todo.id}`)
      .send(todo)
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not edit a todo without an auth token', async function() {

    return supertest(server)
      .put('/todos/someid')
      .expect(401);

  });

};

