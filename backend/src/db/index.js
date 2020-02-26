
const config    = require('../config'), 
      mongoose  = require('mongoose');

module.exports = () => {

  const dbConnection = mongoose
    .createConnection(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  dbConnection.model('users', require('./models/users'));
  dbConnection.model('items', require('./models/items'));

  return dbConnection;

}