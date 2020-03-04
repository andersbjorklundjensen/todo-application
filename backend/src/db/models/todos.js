const mongoose = require('mongoose');

module.exports = new mongoose.Schema({

  title: { type: String, required: true },
  ownerId: { type: String, required: true },
  created: { type: Number, required: true },
  projectId: { type: String, required: true },
  doneStatus: { type: Boolean, required: true },

});
