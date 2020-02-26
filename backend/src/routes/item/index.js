
const Router    = require('@koa/router'),
      authCheck = require('../../middleware/auth-check'),
      koaBody   = require('koa-body')();

const router = new Router({ prefix: '/item' });

// Item routes
router.get('/all', authCheck, require('./get-all'));
router.get('/:id', authCheck, require('./get'));
router.post('/', koaBody, authCheck, require('./add'));
router.put('/:id', koaBody, authCheck, require('./edit'));
router.del('/:id', koaBody, authCheck, require('./delete'));

module.exports = router.routes();
