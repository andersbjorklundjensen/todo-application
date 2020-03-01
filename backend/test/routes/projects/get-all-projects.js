
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

  it('should get all projects correctly', async function() {

 		const user = await auth.createUser();

    const project1 = await projects.createProject(user);
    const project2 = await projects.createProject(user);

    return supertest(server)
      .get('/projects')
      .set('authorization', user.token)
      .expect(200, /projects/);

  });

  it('should not get all projects without an auth token', async function() {

    return supertest(server)
      .get('/projects')
      .expect(401);

  });

};

