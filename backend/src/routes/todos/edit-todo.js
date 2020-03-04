const is = require('is_js');
const mongoose = require('mongoose');

module.exports = async (ctx) => {
  const todoId = ctx.params.id;
  const { title, doneStatus, projectId } = ctx.request.body;

  if (!title || !is.string(title)) { return ctx.throw(400, 'invalid name'); }

  if (!is.boolean(doneStatus)) return ctx.throw(400, 'invalid done status');

  if (!projectId || !is.string(projectId) || !mongoose.Types.ObjectId.isValid(projectId)) return ctx.throw(400, 'invalid project id');


  const projectExists = !!(await ctx.mongo.models.projects
    .findOne({ _id: projectId, ownerId: ctx.state.userId }));

  if (!projectExists) return ctx.throw(400, 'project doesnt exist');

  const todoExists = !!(await ctx.mongo.models.todos
    .findOne({ _id: todoId, ownerId: ctx.state.userId }));

  if (!todoExists) return ctx.throw(400, 'todo doesnt exist');

  await ctx.mongo.models.todos.updateOne({ _id: todoId, ownerId: ctx.state.userId }, {
    $set: {

      title,
      doneStatus,
      projectId,

    },
  });

  ctx.body = {};
};
