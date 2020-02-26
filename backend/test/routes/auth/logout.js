
const supertest = require('supertest'),
      app = require('../../../src')(),
      Utils = require('../../utils');

const server = app.listen();

module.exports = function() {

  const utils = new Utils(app, server);

  before(async function() {

    await app.context.mongo.dropDatabase();

  });

  after(async function() {

    app.context.mongo.close();
    server.close();

  });

  it('should logout a user when a user is correctly logged in', async function() {

    const user = await utils.createUser();

    return supertest(server)
      .post('/auth/logout')
      .set('authorization', user.token)
      .expect(200);

  });

  it('should not logout a user without authorization header', async function() {

    return supertest(server)
      .post('/auth/logout')
      .expect(401);

  });

}
