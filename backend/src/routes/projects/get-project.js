
const is = require('is_js'),
  mongoose = require('mongoose');

module.exports = async (ctx) => {

  const projectId = ctx.params.id;

  if (!projectId || !is.string(projectId) || !mongoose.Types.ObjectId.isValid(projectId))
    return ctx.throw(400, 'invalid project id');

  const project = await ctx.mongo.models.projects.findOne({ _id: projectId, ownerId: ctx.state.userId }).lean();

  if (!project)
    return ctx.throw(400, 'project doesnt exist');

  const todos = await ctx.mongo.models.todos.find({ projectId: projectId, ownerId: ctx.state.userId }).lean();

  ctx.body = {

    projectId: projectId,
    projectName: project.name,
    projectTodos: todos

  };

}
