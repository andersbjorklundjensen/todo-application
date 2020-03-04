const crypto = require('crypto');
const supertest = require('supertest');

class Todos {
  constructor(app, server) {
    this.app = app;
    this.server = server;
  }

  static constructTodo(project) {
    return {
      id: null,
      title: crypto.randomBytes(6).toString('hex'),
      ownerId: null,
      created: null,
      projectId: project.id,
      doneStatus: false,
    };
  }

  async createTodo(user, project) {
    const todo = Todos.constructTodo(project);

    await supertest(this.server)
      .post('/todos')
      .send(todo)
      .set('authorization', user.token)
      .expect(200)
      .then((response) => {
        todo.id = response.body.todoId;
      });

    return todo;
  }
}

module.exports = Todos;
