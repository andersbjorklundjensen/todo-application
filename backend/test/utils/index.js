
const crypto    = require('crypto'),
      supertest = require('supertest');

class Utils {

  constructor(app, server) {
    this.app = app;
    this.server = server;
  }

  constructUser() {

    return {
      username: crypto.randomBytes(6).toString('hex'),
      password: crypto.randomBytes(6).toString('hex'),
      token: null
    }

  }

  async createUser() {

    let user = this.constructUser();

    await supertest(this.server)
      .post('/auth/register')
      .send(user)
      .expect(200)
      .then(response => user.token = response.body.token);

    return user;

  }

  constructItem() {

    return {
      id: null,
      name: crypto.randomBytes(6).toString('hex'),
      ownerId: '',
      created: 0
    }

  }

  async createItem(user) {

    let item = this.constructItem();

    await supertest(this.server)
      .post('/item')
      .set('authorization', user.token)
      .send(item)
      .expect(200)
      .then(response => item.id = response.body.id);

    return item;

  }

}

module.exports = Utils;
