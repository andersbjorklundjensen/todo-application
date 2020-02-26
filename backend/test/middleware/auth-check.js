
const supertest = require('supertest'),
      Utils = require('../utils'),
      app = require('../../src')(),
      crypto = require('crypto');

const server = app.listen();

module.exports = function () {

  const utils = new Utils(app, server);

  before(async function() {

    await app.context.mongo.dropDatabase();

  });

  after(async function() {

    app.context.mongo.close();
    server.close();

  });

  it('should not perform an action with a invalid auth token', async function() {

    const user = await utils.createUser();

    await supertest(server)
      .post('/auth/logout')
      .set('authorization', user.token)
      .expect(200);

    return supertest(server)
      .post('/item')
      .set('authorization', user.token)
      .send({
        title: crypto.randomBytes.toString('hex')
      })
      .expect(401);

  });

  it('should not perform an action with an auth token from a deleted account', async function() {

    const user = await utils.createUser();

    await app.context.mongo.models.users.deleteOne({ username: user.username });

    return supertest(server)
      .post('/item')
      .set('authorization', user.token)
      .send({
        title: crypto.randomBytes.toString('hex')
      })
      .expect(401);

  });

}
