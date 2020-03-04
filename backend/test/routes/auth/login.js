/* globals before, after, it */

const supertest = require('supertest');
const app = require('../../../src')();
const Auth = require('../../utils/Auth');

const server = app.listen();

module.exports = function () {
  const auth = new Auth(app, server);

  before(async function () {
    await app.context.mongo.dropDatabase();
  });

  after(async function () {
    app.context.mongo.close();
    server.close();
  });

  it('should login a user correctly', async function () {
    const user = await auth.createUser();

    return supertest(server)
      .post('/auth/login')
      .send(user)
      .expect(200);
  });

  it('should not login a user without a supplied username', async function () {
    const user = await auth.createUser();

    return supertest(server)
      .post('/auth/login')
      .send({
        ...user,
        username: null,
      })
      .expect(400);
  });

  it('should not login a user without a supplied password', async function () {
    const user = await auth.createUser();

    return supertest(server)
      .post('/auth/login')
      .send({
        ...user,
        password: null,
      })
      .expect(400);
  });

  it('should not login a user which doesnt exist', async function () {
    const user = Auth.constructUser();

    return supertest(server)
      .post('/auth/login')
      .send(user)
      .expect(400);
  });

  it('should not login a user with invalid login credentials', async function () {
    const user = await auth.createUser();

    return supertest(server)
      .post('/auth/login')
      .send({
        ...user,
        password: 'wrongpassword',
      })
      .expect(400);
  });
};
