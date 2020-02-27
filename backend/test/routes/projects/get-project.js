
const supertest = require('supertest'),
      app = require('../../../src')(),
      Auth = require('../../utils/Auth'),
  Projects = require('../../utils/Projects');

const server = app.listen();

module.exports = function() {

  const auth = new Auth(app, server);
  const projects = new Projects(app, server);
  
  before(async function() {

    await app.context.mongo.dropDatabase();

  });

  after(async function() {

    app.context.mongo.close();
    server.close();

  });

  it('should get a project and their todos correctly', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);

    return supertest(server)
      .get(`/projects/${project.id}`)
      .set('authorization', user.token)
      .expect(200, /project/);

  });

  it('should not get a project without a valid project id', async function() {

 		const user = await auth.createUser();

    return supertest(server)
      .get(`/projects/notavalidprojectid`)
      .set('authorization', user.token)
      .expect(400);

  })

  it('should not get a project that doesnt exist', async function() {

 		const user = await auth.createUser();
    const project = await projects.createProject(user);

    await app.context.mongo.models.projects.deleteOne({ _id: project.id });

    return supertest(server)
      .get(`/projects/${project.id}`)
      .set('authorization', user.token)
      .expect(400);

  })

  it('should not get a project without an auth token', async function() {

    return supertest(server)
      .get('/projects/someid')
      .expect(401);

  });

};

