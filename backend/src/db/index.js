const mongoose = require('mongoose');
const config = require('../config');

const userModel = require('./models/users');
const projectModel = require('./models/projects');
const todoModel = require('./models/todos');

module.exports = () => {
  const dbConnection = mongoose
    .createConnection(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  dbConnection.model('users', userModel);
  dbConnection.model('projects', projectModel);
  dbConnection.model('todos', todoModel);

  return dbConnection;
};
