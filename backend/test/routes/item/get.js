
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

  it('should get one item correctly', async function() {

		const user = await utils.createUser();
    const item = await utils.createItem(user);

    return supertest(server)
      .get('/item/' + item.id)
      .set('authorization', user.token)
      .expect(200);

});

	it('should not get an item which doesnt exist', async function() {

    const user = await utils.createUser();
    const item = await utils.createItem(user);

    await app.context.mongo.models.items.deleteOne({ _id: item.id });

    return supertest(server)
      .get('/item/' +  item.id)
      .set('authorization', user.token)
      .expect(400);

  });

  it('should not get an item with an invalid id', async function() {

    const user = await utils.createUser();

    return supertest(server)
      .get('/item/invalidid')
      .set('authorization', user.token)
      .expect(400);

  })

  it('should not get an item without an auth token', async function() {

    return supertest(server)
      .get('/item/someid')
      .expect(401);

  });


}
