const crypto = require('crypto');
const supertest = require('supertest');

class Auth {
  constructor(app, server) {
    this.app = app;
    this.server = server;
  }

  static constructUser() {
    return {
      username: crypto.randomBytes(6).toString('hex'),
      password: crypto.randomBytes(6).toString('hex'),
      token: null,
    };
  }

  async createUser() {
    const user = Auth.constructUser();

    await supertest(this.server)
      .post('/auth/register')
      .send(user)
      .expect(200)
      .then((response) => {
        user.token = response.body.token;
      });

    return user;
  }
}

module.exports = Auth;
