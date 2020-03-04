const Router = require('@koa/router');
const koaBody = require('koa-body')();
const authCheck = require('../../middleware/auth-check');

const router = new Router({ prefix: '/auth' });

// Auth routes
router.post('/register', koaBody, require('./register'));
router.post('/login', koaBody, require('./login'));
router.post('/logout', koaBody, authCheck, require('./logout'));

module.exports = router.routes();
