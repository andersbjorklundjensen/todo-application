const is = require('is_js');
const mongoose = require('mongoose');

module.exports = async (ctx) => {
  const { title, projectId } = ctx.request.body;

  if (!title || !is.string(title)) { return ctx.throw(400, 'invalid name'); }

  if (!projectId || !is.string(projectId) || !mongoose.Types.ObjectId.isValid(projectId)) return ctx.throw(400, 'invalid project id');


  const project = await ctx.mongo.models.projects.findOne({ _id: projectId });

  if (!project) return ctx.throw(400, 'project doesnt exists');

  const todo = await ctx.mongo.models.todos.create({

    title,
    ownerId: ctx.state.userId,
    created: Date.now(),
    projectId,
    doneStatus: false,

  });

  ctx.body = {
    todoId: todo._id,
  };
};
