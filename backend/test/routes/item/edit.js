
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

  it('should edit an item correctly', async function() {

		const user = await utils.createUser();
    const item = await utils.createItem(user);
    
    return supertest(server)
      .put('/item/' + item.id)
      .set('authorization', user.token)
      .send({
        ...item,
        name: 'changedname'
      })
      .expect(200);

  });

  it('should edit done status of a todo correctly', async function() {

    const user = await utils.createUser();
    const todo = await utils.createTodo(user);
    
    return supertest(server)
      .put('/todos/' + todo.id)
      .set('authorization', user.token)
      .send({
        ...todo,
        doneStatus: true,
      })
      .expect(200);

  });

  it('should not edit an item without an auth token', async function() {

    return supertest(server)
      .put('/item/someid')
      .expect(401);

  });

  it('should not edit an item without sending a name', async function() {

		const user = await utils.createUser();
    const item = await utils.createItem(user);

    return supertest(server)
      .put('/item/' + item.id)
      .set('authorization', user.token)
      .send({
        ...item,
        name: null
      })
      .expect(400);

  });

  it('should not edit an item that doesnt exist', async function() {

		const user = await utils.createUser();
    const item = await utils.createItem(user);

    await app.context.mongo.models.items.deleteOne({ _id: item.id });

    return supertest(server)
      .put('/item/' + item.id)
      .set('authorization', user.token)
      .send({
        ...item,
        name: 'anothername'
      })
      .expect(400);

  });

}
