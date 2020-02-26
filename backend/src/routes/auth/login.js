
const is      = require('is_js'), 
      jwt     = require('jsonwebtoken'),
      util    = require('util'), 
      crypto  = require('crypto'),
      bcrypt  = require('bcrypt'),
      config  = require('../../config');

const jwtSign = util.promisify(jwt.sign);

module.exports = async (ctx) => {

  const { username, password } = ctx.request.body;

  if (!username || !is.string(username))
    return ctx.throw(400, 'invalid username');

  if (!password || !is.string(password))
    return ctx.throw(400, 'invlaid password');

  
  const account = await ctx.mongo.models.users.findOne({ username: username });

  if (!account)
    return ctx.throw(400, 'account does not exist');

  const passwordHash = crypto.createHash('sha512').update(password).digest('hex');

  const isPasswordValid = await bcrypt.compare(passwordHash, account.password);

  if (!isPasswordValid)
    return ctx.throw(400, 'invalid login credentials');

  const token = await jwtSign({ userId: account._id, created: Date.now() }, config.JWT_SECRET, { expiresIn: '5h' });
  
  ctx.body = {
    token: token
  }
  
}
