
const mongoose = require('mongoose');

module.exports = async (ctx) => {

  const id = ctx.params.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return ctx.throw(400, 'invalid id');

  await ctx.mongo.models.items.deleteOne({ _id: id });

  ctx.body = {};

}
