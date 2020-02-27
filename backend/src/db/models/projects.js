
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({

  name:    { type: String, required: true },
  ownerId: { type: String, required: true },
  created: { type: String, required: true }

});
