
const Router  = require('@koa/router'),
      authCheck = require('../../middleware/auth-check'),
      koaBody = require('koa-body')();

const router = new Router({ prefix: '/projects' });

// Project routes
router.post('/', koaBody, authCheck, require('./store-project'));
router.get('/', authCheck, require('./get-all-projects'));
router.get('/:id', authCheck, require('./get-project'));
router.put('/:id', koaBody, authCheck, require('./edit-project'));
router.del('/:id', authCheck, require('./delete-project'));

module.exports = router.routes();
