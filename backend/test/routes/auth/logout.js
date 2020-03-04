/* global before after it */

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

  it('should logout a user when a user is correctly logged in', async function () {
    const user = await auth.createUser();

    return supertest(server)
      .post('/auth/logout')
      .set('authorization', user.token)
      .expect(200);
  });

  it('should not logout a user without authorization header', async function () {
    return supertest(server)
      .post('/auth/logout')
      .expect(401);
  });
};
