const is = require('is_js');
const mongoose = require('mongoose');

module.exports = async (ctx) => {
  const projectId = ctx.params.id;
  const { name } = ctx.request.body;

  if (!name || !is.string(name)) { return ctx.throw(400, 'invalid name'); }

  if (!projectId || !is.string(projectId) || !mongoose.Types.ObjectId.isValid(projectId)) return ctx.throw(400, 'invalid project id');

  const projectExists = !!(await ctx.mongo.models.projects
    .findOne({ _id: projectId, ownerId: ctx.state.userId }));

  if (!projectExists) return ctx.throw(400, 'project doesnt exist');

  const projectNameTaken = !!(await ctx.mongo.models.projects
    .findOne({ name, ownerId: ctx.state.userId }));

  if (projectNameTaken) return ctx.throw(400, 'project name is taken');

  await ctx.mongo.models.projects.updateOne({ _id: projectId, ownerId: ctx.state.userId }, {
    $set: {

      name,

    },
  });

  ctx.body = {};
};
