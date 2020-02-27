
const crypto = require('crypto'),
      supertest = require('supertest');

class Auth {

  constructor(app, server) {
    this._app = app;
    this._server = server;
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

    await supertest(this._server)
      .post('/auth/register')
      .send(user)
      .expect(200)
      .then(response => user.token = response.body.token);

    return user;

  }
}

module.exports = Auth;
