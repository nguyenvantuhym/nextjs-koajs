const database = require('./../helpers/database');
const generateToken = require('../helpers/generateToken');

const Router = require('koa-router');

const router = new Router();

router.post('/signup',database.newAccount,generateToken);

module.exports = router;