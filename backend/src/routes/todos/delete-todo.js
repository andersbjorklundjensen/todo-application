
const is = require('is_js'),
      mongoose = require('mongoose');

module.exports = async (ctx) => {
  
  const todoId = ctx.params.id;

  if (!todoId || !is.string(todoId) || !mongoose.Types.ObjectId.isValid(todoId))
    return ctx.throw(400, 'invalid todo id');

  const isTodoOwnedByUser = !! (await ctx.mongo.models.todos.findOne({ _id: todoId, ownerId: ctx.state.userId }));

  if (!isTodoOwnedByUser)
    return ctx.throw(400, 'user doesnt own this todo');

  await ctx.mongo.models.todos.deleteOne({ _id: todoId, ownerId: ctx.state.userId });

  ctx.body = {};

}
