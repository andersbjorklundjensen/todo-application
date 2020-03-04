/* globals describe */

const storeTodo = require('./store-todo');
const editTodo = require('./edit-todo');
const deleteTodo = require('./delete-todo');

module.exports = function () {
  describe('[POST] /todos - Store one todos', storeTodo);
  describe('[PUT] /todos/:id - Edit todos', editTodo);
  describe('[DELETE] /todos/:id - Delete todos', deleteTodo);
};
