
const is = require('is_js');

module.exports = async (ctx) => {

  const { name } = ctx.request.body;

  if (!name || !is.string(name))
    return ctx.throw(400, 'invalid name');

  const item = await ctx.mongo.models.items.create({

    name: name,
    ownerId: ctx.state.userId,
    created: Date.now()

  });

  ctx.body = {
    id: item._id
  }

}
