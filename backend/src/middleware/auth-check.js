const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../config');

const verifyJwt = util.promisify(jwt.verify);

module.exports = async (ctx, next) => {
  const authToken = await verifyJwt(ctx.request.header.authorization, config.JWT_SECRET)
    .catch((err) => err);

  if (authToken instanceof Error) return ctx.throw(401, 'error verifying jwt');

  const user = await ctx.mongo.models.users.findOne({ _id: authToken.userId });

  if (!user) { return ctx.throw(401, 'account not found'); }

  const { lastLogoutTime } = user;

  if (authToken.created < lastLogoutTime) return ctx.throw(401, 'account already logged out');

  ctx.state.userId = authToken.userId;

  await next();
};
