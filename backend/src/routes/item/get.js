
const mongoose  = require('mongoose');

module.exports = async (ctx) => {

  const id = ctx.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return ctx.throw(400, 'invalid id');

  const item = await ctx.mongo.models.items.findOne({ _id: id });

  if (!item)
    return ctx.throw(400, 'item doesnt exist');

  ctx.body = {
    item: item
  }

}