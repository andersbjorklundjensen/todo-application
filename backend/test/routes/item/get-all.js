
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

  it('should get all items correctly', async function() {

 		const user = await utils.createUser();

    return supertest(server)
      .get('/item/all')
      .set('authorization', user.token)
      .expect(200);

  });

  it('should not get all items without an auth token', async function() {

    return supertest(server)
      .get('/item')
      .expect(401);

  });

};

