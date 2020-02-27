
const supertest = require('supertest'),
      app = require('../../../src')(),
      Auth = require('../../utils/Auth');

const server = app.listen();

module.exports = function() {

  const auth = new Auth(app, server);

  before(async function() {

    await app.context.mongo.dropDatabase();

  });

  after(async function() {
    
    app.context.mongo.close();
    server.close();

  });

  it('should register a user with all information correctly supplied', async function() {

    const user = auth.constructUser();

    return supertest(server)
      .post('/auth/register')
      .send(user)
      .expect(200);

  });

  it('should not register a user with invalid username', async function() {

    const user = auth.constructUser();

    return supertest(server)
      .post('/auth/register')
      .send({
        ...user,
        username: null
      })
      .expect(400);

  });

  it('should not register a user with invalid password', async function() {

    const user = auth.constructUser();

    return supertest(server)
      .post('/auth/register')
      .send({
        ...user,
        password: null
      })
      .expect(400);

  });

  it('should not register a user which already exists', async function() {

    const user = await auth.createUser();

    return supertest(server)
      .post('/auth/register')
      .send(user)
      .expect(400);

  });

}
