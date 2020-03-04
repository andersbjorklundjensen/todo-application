const is = require('is_js');

module.exports = async (ctx) => {
  const { name } = ctx.request.body;

  if (!name || !is.string(name)) { return ctx.throw(400, 'invalid name'); }

  const projectExists = !!(await ctx.mongo.models.projects
    .findOne({ ownerId: ctx.state.userId, name }));

  if (projectExists) return ctx.throw(400, 'duplicate project');

  const project = await ctx.mongo.models.projects.create({

    name,
    ownerId: ctx.state.userId,
    created: Date.now(),

  });

  ctx.body = {
    projectId: project._id,
  };
};
