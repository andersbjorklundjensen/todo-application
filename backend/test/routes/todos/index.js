/* globals describe */


module.exports = function() {

  describe('[POST] /todos - Store one todos', require('./store-todo'));
  describe('[PUT] /todos/:id - Edit todos', require('./edit-todo'));
  describe('[DELETE] /todos/:id - Delete todos', require('./delete-todo'));

};

