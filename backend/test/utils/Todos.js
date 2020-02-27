
const crypto = require('crypto'),
  supertest = require('supertest');

class Todos {

  constructor(app, server) {
    this._app = app;
    this._server = server;
  }

  constructTodo(project) {

    return {
      id: null,
      title: crypto.randomBytes(6).toString('hex'),
      ownerId: null,
      created: null,
      projectId: project.id,
      doneStatus: false
    }

  }

  async createTodo(user, project) {

    let todo = this.constructTodo(project);

    await supertest(this._server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(200)
      .then((response) => todo.id = response.body.todoId);

    return todo;

  }

}

module.exports = Todos;
