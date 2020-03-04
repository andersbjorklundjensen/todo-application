const is = require('is_js');
const mongoose = require('mongoose');

module.exports = async (ctx) => {
  const projectId = ctx.params.id;

  if (!projectId || !is.string(projectId) || !mongoose.Types.ObjectId.isValid(projectId)) return ctx.throw(400, 'invalid project id');

  const projectOwnedByUser = !!(await ctx.mongo.models.projects
    .findOne({ _id: projectId, ownerId: ctx.state.userId }));

  if (!projectOwnedByUser) return ctx.throw(400, 'user doesnt own this project');

  await ctx.mongo.models.todos.deleteMany({ projectId, ownerId: ctx.state.userId });

  await ctx.mongo.models.projects.deleteOne({ _id: projectId, ownerId: ctx.state.userId });

  ctx.body = {};
};
