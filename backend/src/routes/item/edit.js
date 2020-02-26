
const is = require('is_js');

module.exports = async (ctx) => {

  const { name } = ctx.request.body;
  const id = ctx.params.id;

  if (!name || !is.string(name))
    return ctx.throw(400, 'invalid name');

  const item = await ctx.mongo.models.items.findOne({ _id: id });

  if (!item)
    return ctx.throw(400, 'item doesnt exist');

  item.name = name;
  item.save();

  ctx.body = {};

}
