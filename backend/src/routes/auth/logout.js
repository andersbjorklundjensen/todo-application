

module.exports = async (ctx) => {
    
  await ctx.mongo.models.users.updateOne({ _id: ctx.state.userId }, { lastLogoutTime: Date.now() });

  ctx.body = {};

}

