
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

  it('should store a todo correctly', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = todos.constructTodo(project);

    return supertest(server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(200, /todoId/);

  });

  it('should not store a todo without a title', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);
    const todo = todos.constructTodo(project);

    return supertest(server)
      .post('/todos')
      .send({
        ...todo,
        title: null
      })
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not store a todo without a valid project id', async function() {

 		const user = await auth.createUser();
    const todo = todos.constructTodo({ id: 'invalidprojectid' });

    return supertest(server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not store a todo with a project id for a project that doesnt exist', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);

    await app.context.mongo.models.projects.deleteOne({ _id: project.id });

    const todo = todos.constructTodo(project);

    return supertest(server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not store a todo without an auth token', async function() {

    return supertest(server)
      .post('/todos')
      .expect(401);

  });

};

