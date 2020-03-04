const Koa = require('koa');
const cors = require('@koa/cors');
const createDb = require('./db');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const todoRoutes = require('./routes/todos');

module.exports = () => {
  const app = new Koa();

  app.context.mongo = createDb();

  // Middleware
  app
    .use(cors());

  // Routes
  app
    .use(authRoutes)
    .use(projectRoutes)
    .use(todoRoutes);

  return app;
};
