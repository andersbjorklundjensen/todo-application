const Router = require('@koa/router');
const koaBody = require('koa-body')();
const authCheck = require('../../middleware/auth-check');

const router = new Router({ prefix: '/todos' });

// Project routes
router.post('/', koaBody, authCheck, require('./store-todo'));
router.put('/:id', koaBody, authCheck, require('./edit-todo'));
router.del('/:id', authCheck, require('./delete-todo'));

module.exports = router.routes();
