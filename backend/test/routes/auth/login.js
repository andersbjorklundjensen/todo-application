
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

  it('should login a user correctly', async function() {

    const user = await utils.createUser();

    return supertest(server)
      .post('/auth/login')
      .send(user)
      .expect(200);

  });

  it('should not login a user without a supplied username', async function() {

    const user = await utils.createUser();

    return supertest(server)
      .post('/auth/login')
      .send({
        ...user,
        username: null
      })
      .expect(400);

  });

  it('should not login a user without a supplied password', async function() {

    const user = await utils.createUser();

    return supertest(server)
      .post('/auth/login')
      .send({
        ...user, 
        password: null
      })
      .expect(400);

  });

  it('should not login a user which doesnt exist', async function() {

    const user = utils.constructUser();

    return supertest(server)
      .post('/auth/login')
      .send(user)
      .expect(400);

  });

  it('should not login a user with invalid login credentials', async function() {

    const user = await utils.createUser();

    return supertest(server)
      .post('/auth/login')
      .send({
        ...user,
        password: 'wrongpassword'
      })
      .expect(400);

  });
}
