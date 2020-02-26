

module.exports = async (ctx) => {

  const allItems = await ctx.mongo.models.items.find({});

  ctx.body = {
    items: allItems
  }

}