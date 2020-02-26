
const is      = require('is_js'),
      crypto  = require('crypto'), 
      bcrypt  = require('bcrypt'),
      util    = require('util'),
      config  = require('../../config'),
      jwt     = require('jsonwebtoken');

const jwtSign = util.promisify(jwt.sign);

module.exports = async (ctx) => {

  const { username, password } = ctx.request.body;

  if (!username || !is.string(username))
    return ctx.throw(400, 'invalid username');

  if (!password | !is.string(password))
    return ctx.throw(400, 'invalid password');

  
  const accountExists = await ctx.mongo.models.users.findOne({ username: username });
  
  if (accountExists)
    return ctx.throw(400, 'account already exists');

  
  const passwordHash = crypto.createHash('sha512').update(password).digest('hex');

  const encryptedPassword = await bcrypt.hash(passwordHash, 11);

  const user = await ctx.mongo.models.users.create({

    username: username, 
    password: encryptedPassword,
    created: Date.now(),
    lastLogoutTime: 0

  });


  const token = await jwtSign({ userId: user._id, created: Date.now() }, config.JWT_SECRET, { expiresIn: '5h' });

  ctx.body = {
    token: token
  }

}