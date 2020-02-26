
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

  it('should delete an item correctly', async function() {

    const user = await utils.createUser();
    const item = await utils.createItem(user);

    return supertest(server)
      .del('/item/' + item.id)
      .set('authorization', user.token)
      .expect(200);

  });

  it('should not delete an item without an auth token', async function() {

    return supertest(server)
      .del('/item/someid')
      .expect(401);
    
  });

  it('should not delete an item with an invalid id', async function() {

		const user = await utils.createUser();

    return supertest(server)
      .del('/item/someid')
      .set('authorization', user.token)
      .expect(400);

  });

};

