const database = require('./../helpers/database');

const Router = require('koa-router');


const router = new Router();
router.post('/signin',database.login);



module.exports = router;