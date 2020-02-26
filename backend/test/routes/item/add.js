
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

  it('should add a item correctly', async function() {

		const user = await utils.createUser();
    const item = utils.constructItem();

    return supertest(server)
      .post('/item')
      .set('authorization', user.token)
      .send(item)
      .expect(200);

  });

  it('should not add an item without an auth token', async function() {

    return supertest(server)
      .post('/item')
      .expect(401);

  });

  it('should not add an item without a name', async function() {

		const user = await utils.createUser();
    const item = utils.constructItem();

    return supertest(server)
      .post('/item')
      .set('authorization', user.token)
      .send({
        ...item,
        name: null
      })
      .expect(400);

  })

}
