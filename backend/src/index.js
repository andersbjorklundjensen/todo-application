
const Koa     = require('koa'),
      createDb = require('./db'),
      cors    = require('@koa/cors');

module.exports = () => {

  const app = new Koa();

  app.context.mongo = createDb();

  // Middleware
  app
    .use(cors());
  
  // Routes
  app
    .use(require('./routes/auth'))
    .use(require('./routes/item'));

  return app;

}
