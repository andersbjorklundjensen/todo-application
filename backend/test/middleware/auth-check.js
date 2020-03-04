/* globals before, after, it */
const supertest = require('supertest');
const crypto = require('crypto');
const Auth = require('../utils/Auth');
const app = require('../../src')();

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

  it('should not perform an action with a invalid auth token', async function () {
    const user = await auth.createUser();

    await supertest(server)
      .post('/auth/logout')
      .set('authorization', user.token)
      .expect(200);

    return supertest(server)
      .post('/projects')
      .set('authorization', user.token)
      .send({
        title: crypto.randomBytes.toString('hex'),
      })
      .expect(401);
  });

  it('should not perform an action with an auth token from a deleted account', async function () {
    const user = await auth.createUser();

    await app.context.mongo.models.users.deleteOne({ username: user.username });

    return supertest(server)
      .post('/projects')
      .set('authorization', user.token)
      .send({
        title: crypto.randomBytes.toString('hex'),
      })
      .expect(401);
  });
};
