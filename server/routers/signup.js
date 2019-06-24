const database = require('./../helpers/database');
const auth = require('./../helpers/auth');

const Router = require('koa-router');

const router = new Router();

router.post('/signup',database.newAccount,auth);

module.exports = router;